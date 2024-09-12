type SectionTitleProps = {
  title: string;
  textColour: string;
  lineColour: string;
  alignment: string;
};

export const SectionTitle = ({
  title,
  lineColour,
  textColour,
  alignment,
}: SectionTitleProps) => {
  return (
    <div
      className={`flex flex-col space-y-3 mb-32 ${
        alignment === 'centred' ? 'items-center' : 'items-start'
      }`}
    >
      <h2
        className={`${alignment === 'centred' ? 'text-4xl' : 'text-2xl'} ${
          textColour === 'ash' ? 'text-ash' : 'text-chalk'
        } text-center`}
      >
        {title}
      </h2>
      <hr className={`border-${lineColour} border-t-2 w-20`} />
    </div>
  );
};
