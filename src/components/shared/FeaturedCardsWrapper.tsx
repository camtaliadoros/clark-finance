export const FeaturedCardsWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='flex flex-col items-center justify-center space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:grid-rows-1 lg:grid-cols-3 md:items-start w-full'>
      {children}
    </div>
  );
};