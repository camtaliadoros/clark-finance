export const FeaturedCardsWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='flex flex-col items-center mt-0 space-y-4 md:grid md:grid-cols-2 md:gap-20 md:grid-rows-1 lg:grid-cols-3 md:items-start w-full mb-8'>
      {children}
    </div>
  );
};
