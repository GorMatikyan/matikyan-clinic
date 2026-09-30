import { defineConfig } from 'vite'
import path from 'path'
import { readFileSync } from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

// PhotoSlider's first slide (hero-clinic-exterior-01) is the page's LCP element, but as a pure
// client-rendered SPA the browser's HTML preload scanner can't see it - the <img> only exists
// once React has downloaded, parsed and executed the whole JS bundle and rendered Home. Injecting
// a <link rel="preload"> for it here (post-build, once Vite has content-hashed the filename) lets
// the browser start fetching it in parallel with JS execution instead of waiting for React to
// mount. Widths/sizes mirror the srcSet/sizes PhotoSlider itself uses for slide index 0.
function heroImagePreloadPlugin() {
  return {
    name: 'hero-image-preload',
    transformIndexHtml: {
      order: 'post' as const,
      handler(html: string, ctx: { bundle?: Record<string, { type: string; fileName: string }> }) {
        const bundle = ctx.bundle
        if (!bundle) return html

        const assets = Object.values(bundle).filter((chunk) => chunk.type === 'asset')
        const desktop = assets.find((chunk) => /(^|\/)hero-clinic-exterior-01-(?!mobile-)[\w-]+\.webp$/.test(chunk.fileName))
        const mobile = assets.find((chunk) => /(^|\/)hero-clinic-exterior-01-mobile-[\w-]+\.webp$/.test(chunk.fileName))
        if (!desktop || !mobile) return html

        const preloadTag = `<link rel="preload" as="image" imagesrcset="/${mobile.fileName} 960w, /${desktop.fileName} 1672w" imagesizes="100vw" fetchpriority="high" />`
        return html.replace('</head>', `      ${preloadTag}\n    </head>`)
      },
    },
  }
}

// GA4 (gtag.js) and Yandex Metrica tags, baked into the built index.html's raw <head> from the
// admin Settings (src/generated/settings.json, written by scripts/export-seo-files.mjs - which
// already nulls both IDs on the staging build). Static markup rather than injected by React so
// that (a) SEO audit tools / "view source" / Search Console's GA verification can see them, and
// (b) the initial hit fires as soon as the HTML parses instead of after the whole JS bundle has
// loaded and React has mounted. Build-only, so `npm run dev` never sends real analytics hits.
//
// Both are the vendors' official snippets, verbatim - GA4 history on this site shows why:
// - Until 2026-09-03 gtag.js was loaded via a hand-rolled `gtag(...args) { dataLayer.push(args) }`
//   shim and silently never sent a hit for months: gtag.js only treats `arguments` objects on the
//   dataLayer as gtag() commands; a plain array is read as a different command format and ignored.
// - 2026-09-03..30 the site posted page_views straight to the Measurement Protocol instead (no
//   geo/device/traffic-source/engagement data - see matikyan-clinic commit 199784c).
// - 2026-09-30 back to gtag.js with the official snippet (verified sending /g/collect), first via
//   a React component, then moved here into the raw HTML.
function analyticsTagsPlugin() {
  return {
    name: 'analytics-tags',
    apply: 'build' as const,
    transformIndexHtml(html: string) {
      const settingsPath = path.resolve(__dirname, 'src/generated/settings.json')
      const settings = JSON.parse(readFileSync(settingsPath, 'utf-8')) as {
        googleAnalyticsId?: string | null
        yandexMetricaId?: string | null
      }
      const gaId = settings.googleAnalyticsId?.trim()
      const ymId = settings.yandexMetricaId?.trim()
      if (gaId && !/^G-[A-Z0-9]+$/.test(gaId)) throw new Error(`Invalid googleAnalyticsId: ${gaId}`)
      if (ymId && !/^\d+$/.test(ymId)) throw new Error(`Invalid yandexMetricaId: ${ymId}`)

      const headTags: string[] = []
      if (gaId) {
        // gtag.js owns page_view entirely: config sends the initial one, and GA4's Enhanced
        // Measurement "Page changes based on browser history events" (on for this stream) sends
        // one per SPA route change - never also send page_view manually (double-counts).
        // Consent: this site has no cookie-consent banner and no EU/GDPR audience - grant all
        // four Consent Mode v2 signals so gtag.js doesn't withhold hits waiting for an update.
        headTags.push(
          `<!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent', 'default', { ad_storage: 'granted', analytics_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' });
      gtag('js', new Date());
      gtag('config', '${gaId}');
    </script>`,
        )
      }
      if (ymId) {
        // init sends the landing page's hit itself; YandexMetrica.tsx sends one per later SPA
        // route change (tag.js doesn't track History API navigation on its own).
        headTags.push(
          `<!-- Yandex.Metrika counter -->
    <script type="text/javascript">
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=${ymId}", "ym");
      ym(${ymId}, "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: false, ecommerce: false });
    </script>
    <!-- /Yandex.Metrika counter -->`,
        )
      }
      if (headTags.length === 0) return html

      // After charset/viewport (charset must stay within the first 1024 bytes), otherwise as
      // high in <head> as possible, per both vendors' install instructions.
      const anchor = /<meta name="viewport"[^>]*>/
      if (!anchor.test(html)) throw new Error('analytics-tags: <meta name="viewport"> not found in index.html')
      let result = html.replace(anchor, (match) => `${match}\n      ${headTags.join('\n      ')}`)
      if (ymId) {
        result = result.replace(
          /<body>/,
          `<body>\n    <noscript><div><img src="https://mc.yandex.ru/watch/${ymId}" style="position:absolute; left:-9999px;" alt="" /></div></noscript>`,
        )
      }
      return result
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    heroImagePreloadPlugin(),
    analyticsTagsPlugin(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
