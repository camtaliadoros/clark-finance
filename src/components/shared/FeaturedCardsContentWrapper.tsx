export const FeaturedCardsContentWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='flex flex-col justify-start space-y-2 w-56 2xl:w-96 mb-24'>
      {children}
    </div>
  );
};
