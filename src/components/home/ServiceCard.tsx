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
    <Link
      className='relative h-52 group no-underline'
      href={`services/${slug}`}
      prefetch={true}
    >
      <div className='bg-lightgrey1 relative px-4 py-6 h-full space-y-4 rounded-br-[120px] z-10 transition-all group-hover:bg-lightgrey2 group-hover:rounded-br-[140px] '>
        <h2 className='font-semibold text-lg 2xl:text-xl 2xl:h-2/5 2xl:leading-none h-1/3 w-4/5 leading-tight '>
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
              8: 'border-teal',
            }[order]
          } `}
        />
        <p className='w-2/3 font-light text-base 2xl:text-base '>{excerpt}</p>
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
            8: 'bg-teal',
          }[order]
        } h-full w-full flex justify-end items-end `}
      >
        <p className='font-bold m-2 text-chalk text-sm leading-none'>MORE</p>
      </div>
    </Link>
  );
};
