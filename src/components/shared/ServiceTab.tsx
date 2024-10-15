import Link from 'next/link';

type ServiceTabProps = {
  service: ServiceTabData;
  activePageSlug: string;
};

type ServiceTabData = {
  title: string;
  link: string;
  slug: string;
  order: number;
};

export const ServiceTab = ({ service, activePageSlug }: ServiceTabProps) => {
  return (
    <Link
      className={`px-4 py-2 text-center text-sm 2xl:text-xl font-semibold ${
        activePageSlug === service.slug ? 'text-chalk' : 'text-ash'
      } no-underline border-b-2 ${
        activePageSlug === service.slug
          ? {
              1: 'bg-green',
              2: 'bg-yellow',
              3: 'bg-orange',
              4: 'bg-purple',
              5: 'bg-magenta',
              6: 'bg-navy',
              7: 'bg-red',
              8: 'bg-bluegrey',
            }[service.order]
          : 'bg-lightgrey2'
      } ${
        {
          1: 'border-b-green',
          2: 'border-b-yellow',
          3: 'border-b-orange',
          4: 'border-b-purple',
          5: 'border-b-magenta',
          6: 'border-b-navy',
          7: 'border-b-red',
          8: 'border-b-bluegrey',
        }[service.order]
      } ${
        {
          1: 'hover:bg-green',
          2: 'hover:bg-yellow',
          3: 'hover:bg-orange',
          4: 'hover:bg-purple',
          5: 'hover:bg-magenta',
          6: 'hover:bg-navy',
          7: 'hover:bg-red',
          8: 'hover:bg-bluegrey',
        }[service.order]
      } hover:text-chalk transition`}
      href={service.slug}
      prefetch={true}
    >
      {service.title}
    </Link>
  );
};
