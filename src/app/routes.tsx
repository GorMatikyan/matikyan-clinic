import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Doctors } from "./pages/Doctors";
import { Reviews } from "./pages/Reviews";
import { FAQ } from "./pages/FAQ";
import { Blog } from "./pages/Blog";
import { Contact } from "./pages/Contact";
import { Services } from "./pages/Services";
import { LogoPreview } from "./pages/LogoPreview";

function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center px-6">
      <div>
        <div className="text-primary mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "5rem", lineHeight: 1 }}>404</div>
        <h2 className="text-foreground mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem" }}>Page Not Found</h2>
        <p className="text-muted-foreground mb-6">The page you're looking for doesn't exist.</p>
        <a href="/" className="px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm hover:bg-primary/90 transition-colors inline-block">
          Go Home
        </a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "doctors", Component: Doctors },
      { path: "reviews", Component: Reviews },
      { path: "services", Component: Services },
      { path: "faq", Component: FAQ },
      { path: "blog", Component: Blog },
      { path: "contact", Component: Contact },
      { path: "logo-preview", Component: LogoPreview },
      { path: "*", Component: NotFound },
    ],
  },
]);
