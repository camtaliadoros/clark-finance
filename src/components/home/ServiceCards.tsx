import { Section } from '../shared/Section';
import { ServiceCard } from './ServiceCard';

type PageProps = {
  classes: string;
};

type Service = {
  slug: string;
  link: string;
  acf: ServiceAcfFields;
};

type ServiceAcfFields = {
  service_title: string;
  service_excerpt: string;
  homepage_order: number;
};

async function fetchAllServices() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/services/api`, {
    next: {
      revalidate: 10,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export const ServiceCards = async ({ classes }: PageProps) => {
  const services: Service[] = await fetchAllServices();

  // Order services by priority
  services.sort((a, b) => a.acf.homepage_order - b.acf.homepage_order);

  return (
    <Section type='wide' classes={`${classes}  py-0`}>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 -mt-48'>
        {services.map((service) => (
          <ServiceCard
            key={service.acf.homepage_order}
            title={service.acf.service_title}
            excerpt={service.acf.service_excerpt}
            link={service.link}
            slug={service.slug}
            order={service.acf.homepage_order}
          />
        ))}
      </div>
    </Section>
  );
};
