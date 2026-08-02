import { ServiceLandingPage } from "../components/ServiceLandingPage";
import { getLocalizedRelatedServicesBySlug, getLocalizedServiceDetailBySlug } from "../serviceData";

type ServiceDetailProps = {
  serviceSlug: string;
};

export function ServiceDetail({ serviceSlug }: ServiceDetailProps) {
  const service = getLocalizedServiceDetailBySlug(serviceSlug);

  if (!service) {
    return null;
  }

  return <ServiceLandingPage service={service} relatedServices={getLocalizedRelatedServicesBySlug(serviceSlug)} />;
}
