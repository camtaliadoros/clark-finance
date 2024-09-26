export const FeaturedCardsWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='flex flex-col mt-0 space-y-12 md:grid md:grid-cols-2 md:grid-rows-1 lg:grid-cols-3 md:items-start w-full'>
      {children}
    </div>
  );
};
