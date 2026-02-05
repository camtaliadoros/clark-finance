import { ServicePageContent } from '@/util/models';
import { getApiBaseUrl } from '@/util/utilFunctions';
import { Section } from '../shared/Section';
import { ServiceCard } from './ServiceCard';

type PageProps = {
  classes?: string;
};

type Service = {
  slug: string;
  link: string;
  acf: ServicePageContent;
};

async function fetchAllServices() {
  const baseUrl = getApiBaseUrl();
  const apiUrl = baseUrl 
    ? `${baseUrl}/services/api/fetchServiceCards` 
    : '/services/api/fetchServiceCards';
  
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
}

export const ServiceCards = async ({ classes }: PageProps) => {
  const services: Service[] = await fetchAllServices();

  // Order services by priority
  services.sort(
    (a, b) =>
      a.acf.service_card.homepage_order - b.acf.service_card.homepage_order
  );

  return (
    <Section type='wide' classes={`${classes} `}>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 -mt-44'>
        {services.map((service) => (
          <ServiceCard
            key={service.acf.service_card.homepage_order}
            title={service.acf.service_card.service_title}
            excerpt={service.acf.service_card.service_excerpt}
            link={service.link}
            slug={service.slug}
            order={service.acf.service_card.homepage_order}
          />
        ))}
      </div>
    </Section>
  );
};
