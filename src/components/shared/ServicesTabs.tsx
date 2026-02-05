import { Service } from '@/util/models';
import { getApiBaseUrl } from '@/util/utilFunctions';
import { ServiceTab } from './ServiceTab';

type ServiceTabsProps = {
  activePageSlug: string;
};

const fetchAllServices = async () => {
  const baseUrl = getApiBaseUrl();
  const apiUrl = baseUrl 
    ? `${baseUrl}/services/api/fetchAllServices` 
    : '/services/api/fetchAllServices';
  
  const res = await fetch(apiUrl,
    {
      next: {
        revalidate: 86400,
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export const ServicesTabs = async ({ activePageSlug }: ServiceTabsProps) => {
  const services: Service[] = await fetchAllServices();

  const filteredServices = services.map((service) => {
    return {
      title: service.acf.service_card.service_title,
      order: service.acf.service_card.homepage_order,
      link: service.link,
      slug: service.slug,
    };
  });

  filteredServices.sort((a, b) => a.order - b.order);

  return (
    <div className='hidden md:flex flex-row gap-0 bg-chalk shadow-inner'>
      {filteredServices.map((service) => (
        <ServiceTab
          service={service}
          activePageSlug={activePageSlug}
          key={service.slug}
        />
      ))}
    </div>
  );
};
