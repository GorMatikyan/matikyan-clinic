import type { ComponentProps } from "react";
import { NavLink, useLocation } from "react-router";

export const PRIMARY_LANGUAGE = "hy" as const;
export const SECONDARY_LANGUAGES = ["en", "ru"] as const;
export const SUPPORTED_LANGUAGES = [PRIMARY_LANGUAGE, ...SECONDARY_LANGUAGES] as const;

export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];

type LocalizedNavLinkProps = Omit<ComponentProps<typeof NavLink>, "to"> & {
  to: string;
};

export function LocalizedNavLink({ to, ...props }: LocalizedNavLinkProps) {
  const language = useCurrentLanguage();
  return <NavLink to={localizePath(to, language)} {...props} />;
}

export function useCurrentLanguage(): AppLanguage {
  const { pathname } = useLocation();
  return getLanguageFromPathname(pathname);
}

export function getLanguageFromPathname(pathname: string): AppLanguage {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return isSecondaryLanguage(firstSegment) ? firstSegment : PRIMARY_LANGUAGE;
}

export function stripLanguagePrefix(pathname: string) {
  const normalizedPath = normalizePath(pathname);
  const segments = normalizedPath.split("/").filter(Boolean);

  if (segments.length === 0 || !isSecondaryLanguage(segments[0])) {
    return normalizedPath;
  }

  const stripped = `/${segments.slice(1).join("/")}`;
  return stripped === "/" ? "/" : normalizePath(stripped);
}

export function localizePath(path: string, language: AppLanguage) {
  const normalizedPath = normalizePath(stripLanguagePrefix(path));

  if (language === PRIMARY_LANGUAGE) {
    return normalizedPath;
  }

  return normalizedPath === "/" ? `/${language}` : `/${language}${normalizedPath}`;
}

export function getLocalizedPathForLanguage(pathname: string, language: AppLanguage) {
  return localizePath(stripLanguagePrefix(pathname), language);
}

export function isSecondaryLanguage(value: string | undefined): value is (typeof SECONDARY_LANGUAGES)[number] {
  return value === "en" || value === "ru";
}

function normalizePath(path: string) {
  const [pathname] = path.split(/[?#]/);
  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const trimmed = withLeadingSlash.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}
