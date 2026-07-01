import { Suspense, lazy, type ReactNode } from "react";
import { createBrowserRouter, useParams, type RouteObject } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { isSecondaryLanguage, LocalizedNavLink, stripLanguagePrefix } from "./routing";
import { serviceDetails } from "./serviceData";

const About = lazy(async () => {
  const module = await import("./pages/About");
  return { default: module.About };
});

const Doctors = lazy(async () => {
  const module = await import("./pages/Doctors");
  return { default: module.Doctors };
});

const Reviews = lazy(async () => {
  const module = await import("./pages/Reviews");
  return { default: module.Reviews };
});

const FAQ = lazy(async () => {
  const module = await import("./pages/FAQ");
  return { default: module.FAQ };
});

const Blog = lazy(async () => {
  const module = await import("./pages/Blog");
  return { default: module.Blog };
});

const Contact = lazy(async () => {
  const module = await import("./pages/Contact");
  return { default: module.Contact };
});

const Services = lazy(async () => {
  const module = await import("./pages/Services");
  return { default: module.Services };
});

const ServiceDetail = lazy(async () => {
  const module = await import("./pages/ServiceDetail");
  return { default: module.ServiceDetail };
});

function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center px-6">
      <div>
        <div className="text-primary mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "5rem", lineHeight: 1 }}>404</div>
        <h1 className="text-foreground mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem" }}>Page Not Found</h1>
        <p className="text-muted-foreground mb-6">The page you're looking for doesn't exist.</p>
        <LocalizedNavLink to="/" className="px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm hover:bg-primary/90 transition-colors inline-block">
          Go Home
        </LocalizedNavLink>
      </div>
    </div>
  );
}

function LocalizedLayout() {
  const { lang } = useParams();

  if (!isSecondaryLanguage(lang)) {
    return <NotFound />;
  }

  return <Layout />;
}

function RouteLoader() {
  return (
    <div className="min-h-[60vh] px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="h-8 w-48 rounded-full bg-[#B5C7EB]/20" />
        <div className="mt-6 h-12 w-full max-w-2xl rounded-2xl bg-[#0F1932]/8" />
        <div className="mt-4 h-5 w-full max-w-3xl rounded-full bg-[#0F1932]/6" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-56 rounded-3xl bg-[#0F1932]/5" />
          ))}
        </div>
      </div>
    </div>
  );
}

function LazyRoute({ children }: { children: ReactNode }) {
  return <Suspense fallback={<RouteLoader />}>{children}</Suspense>;
}

const routeChildren: RouteObject[] = [
  { index: true, Component: Home },
  { path: "about", Component: () => <LazyRoute><About /></LazyRoute> },
  { path: "doctors", Component: () => <LazyRoute><Doctors /></LazyRoute> },
  { path: "reviews", Component: () => <LazyRoute><Reviews /></LazyRoute> },
  { path: "services", Component: () => <LazyRoute><Services /></LazyRoute> },
  { path: "faq", Component: () => <LazyRoute><FAQ /></LazyRoute> },
  { path: "blog", Component: () => <LazyRoute><Blog /></LazyRoute> },
  { path: "contact", Component: () => <LazyRoute><Contact /></LazyRoute> },
  ...serviceDetails.map((service) => ({
    path: stripLanguagePrefix(service.slug).slice(1),
    Component: () => (
      <LazyRoute>
        <ServiceDetail serviceSlug={service.slug} />
      </LazyRoute>
    ),
  })),
  { path: "*", Component: NotFound },
];

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: routeChildren,
  },
  {
    path: ":lang",
    Component: LocalizedLayout,
    children: routeChildren,
  },
]);
