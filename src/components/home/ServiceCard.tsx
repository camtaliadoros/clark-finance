import Link from 'next/link';

type ServiceCardProps = {
  title: string;
  excerpt: string;
  slug: string;
  link: string;
  order: number;
};

export const ServiceCard = ({
  title,
  excerpt,
  slug,
  link,
  order,
}: ServiceCardProps) => {
  return (
    <Link className='relative h-52' href={`services/${slug}`}>
      <div className='bg-lightgrey relative px-4 py-6 h-full space-y-4 rounded-br-[120px] z-10'>
        <h2 className='font-semibold text-xl h-1/3 w-2/3 leading-tight '>
          {title}
        </h2>
        <hr
          className={`border-t-2 ${
            {
              1: 'border-green',
              2: 'border-yellow',
              3: 'border-orange',
              4: 'border-purple',
              5: 'border-magenta',
              6: 'border-navy',
              7: 'border-red',
              8: 'border-bluegrey',
            }[order]
          } `}
        />
        <p className='w-2/3 font-light'>{excerpt}</p>
      </div>
      <div
        className={`absolute top-0 left-0 ${
          {
            1: 'bg-green',
            2: 'bg-yellow',
            3: 'bg-orange',
            4: 'bg-purple',
            5: 'bg-magenta',
            6: 'bg-navy',
            7: 'bg-red',
            8: 'bg-bluegrey',
          }[order]
        } h-full w-full flex justify-end items-end `}
      >
        <p className='font-bold m-2 text-chalk text-sm leading-none'>MORE</p>
      </div>
    </Link>
  );
};
