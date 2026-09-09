import { defineConfig } from 'vite'
import path from 'path'
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

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    heroImagePreloadPlugin(),
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
