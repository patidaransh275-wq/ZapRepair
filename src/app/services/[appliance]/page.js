import { permanentRedirect } from 'next/navigation';
import { SERVICES_DATA } from '../../../data/servicesData';
import { getLegacyServiceRedirect } from '../../../data/categoriesData';

export function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    appliance: service.slug
  }));
}

export default function LegacyServiceRedirectPage({ params }) {
  const { appliance } = params;
  const targetUrl = getLegacyServiceRedirect(appliance);
  permanentRedirect(targetUrl);
}
