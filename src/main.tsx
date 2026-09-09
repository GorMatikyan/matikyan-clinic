
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";
  import { initialLanguageReady } from "./i18n";

  // null for the common case (hy, bundled eagerly - see src/i18n/index.ts); only a direct /en or
  // /ru landing waits here, for the one JSON chunk fetch needed before rendering that language.
  Promise.resolve(initialLanguageReady).then(() => {
    createRoot(document.getElementById("root")!).render(<App />);
  });
