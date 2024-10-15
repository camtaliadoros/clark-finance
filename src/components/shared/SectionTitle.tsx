type SectionTitleProps = {
  title: string | undefined;
  textColour: 'ash' | 'chalk';
  lineColour: 'chalk' | 'mediumblue';
  alignment: 'centred' | 'start' | 'end';
  classes?: string;
};

export const SectionTitle = ({
  title,
  lineColour,
  textColour,
  alignment,
  classes,
}: SectionTitleProps) => {
  return (
    <div
      className={` ${classes} flex flex-col space-y-3 2xl:space-y-6 ${
        alignment === 'centred' ? 'items-center' : 'items-start'
      } `}
    >
      <h2
        className={`${
          alignment === 'centred' ? 'text-4xl 2xl:text-5xl' : 'text-2xl'
        } ${textColour === 'ash' ? 'text-ash' : 'text-chalk'} text-center`}
      >
        {title}
      </h2>
      <hr className={`border-${lineColour} border-t-2 w-20`} />
    </div>
  );
};
