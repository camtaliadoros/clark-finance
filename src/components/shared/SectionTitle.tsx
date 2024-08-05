type SectionTitleProps = {
  title: string;
  colour: string;
};

export const SectionTitle = ({ title, colour }: SectionTitleProps) => {
  return (
    <div className='space-y-3'>
      <h2 className='text-chalk'>{title}</h2>
      <hr className={`border-${colour} border-t-2 w-20`} />
    </div>
  );
};
