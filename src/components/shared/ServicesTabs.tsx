import { Service } from '@/util/models';
import { ServiceTab } from './ServiceTab';

type ServiceTabsProps = {
  activePageSlug: string;
};

const fetchAllServices = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/services/api/fetchAllServices`,
    {
      // next: {
      //   revalidate: 10,
      // },
      cache: 'no-store',
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
      title: service.acf.service_title,
      order: service.acf.homepage_order,
      link: service.link,
      slug: service.slug,
    };
  });

  filteredServices.sort((a, b) => a.order - b.order);

  return (
    <div className='hidden md:flex flex-row justify-between gap-0'>
      {filteredServices.map((service) => (
        <ServiceTab service={service} activePageSlug={activePageSlug} />
      ))}
    </div>
  );
};
