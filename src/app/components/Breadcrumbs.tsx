import { Fragment } from "react";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { LocalizedNavLink, stripLanguagePrefix } from "../routing";
import { useSeoOverride } from "../seoOverrides";
import { getLocalizedServiceDetailBySlug } from "../serviceData";

const STATIC_LABEL_KEYS: Record<string, string> = {
  about: "nav.about",
  doctors: "nav.doctors",
  services: "nav.services",
  faq: "nav.faq",
  blog: "nav.blog",
  contact: "nav.contact",
  warranty: "nav.warranty",
  "dental-tourism": "nav.dentalTourism",
};

/**
 * Route-driven breadcrumb trail rendered on every page (mounted once in Layout) rather than wired
 * per-page - segment labels come from the same nav translation keys the header already uses, plus
 * live data (service titles, blog post titles) for dynamic routes. Omitted on the home page.
 *
 * Styled dark (matching every page's own #0F1932 hero directly beneath it) rather than light, so
 * it forms one continuous dark surface with the hero - this is what lets the navbar's transparent
 * white-logo overlay treatment stay consistent site-wide instead of only working on Home's photo.
 */
export function Breadcrumbs() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const routePath = stripLanguagePrefix(pathname);
  const liveOverride = useSeoOverride(routePath);

  if (routePath === "/") {
    return null;
  }

  const segments = routePath.split("/").filter(Boolean);

  let accumulatedPath = "";
  const crumbs = segments.map((segment, index) => {
    accumulatedPath += `/${segment}`;
    const isLast = index === segments.length - 1;

    let label = segment;
    if (STATIC_LABEL_KEYS[segment]) {
      label = t(STATIC_LABEL_KEYS[segment]);
    } else if (segments[0] === "services" && index === 1) {
      label = getLocalizedServiceDetailBySlug(routePath)?.title ?? segment;
    } else if (segments[0] === "blog" && index === 1) {
      label = liveOverride?.breadcrumbLabel ?? segment;
    }

    return { label, path: isLast ? null : accumulatedPath };
  });

  return (
    <div className="pt-20 bg-[#0F1932]">
      <div className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-8 py-3">
        <Breadcrumb>
          <BreadcrumbList className="text-white/50">
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="hover:text-[#B5C7EB]">
                <LocalizedNavLink to="/" aria-label={t("nav.home", { defaultValue: "Home" })}>
                  <Home className="h-3.5 w-3.5" />
                </LocalizedNavLink>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {crumbs.map((crumb, index) => (
              <Fragment key={`${crumb.label}-${index}`}>
                <BreadcrumbSeparator className="[&>svg]:text-white/30" />
                <BreadcrumbItem>
                  {crumb.path ? (
                    <BreadcrumbLink asChild className="hover:text-[#B5C7EB]">
                      <LocalizedNavLink to={crumb.path}>{crumb.label}</LocalizedNavLink>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="text-white">{crumb.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
