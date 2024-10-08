import Link from 'next/link';

type ClickableImageProps = {
  slug: string;
  imageUrl: string;
};

export const ClickableImage = ({ slug, imageUrl }: ClickableImageProps) => {
  return (
    <Link
      className='flex relative w-56 h-56 group mb-8'
      href={slug}
      prefetch={true}
    >
      <div
        className='bg-cover bg-center w-full h-full relative rounded-br-[120px] z-10 transition-all group-hover:opacity-90 group-hover:rounded-br-[140px]'
        style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
      ></div>
      <div
        className={`absolute top-0 left-0 bg-lightblue
      } h-full w-full flex justify-end items-end `}
      >
        <p className='font-bold m-2 text-chalk text-sm leading-none'>MORE</p>
      </div>
    </Link>
  );
};
