type SectionProps = {
  type: string;
  children: React.ReactNode;
  classes?: string;
  sectionId?: string;
};

export const Section = ({
  children,
  type,
  classes,
  sectionId,
}: SectionProps) => {
  return (
    <section
      className={` ${
        type === 'wide' ? 'px-4 2xl:px-60' : ' px-4 md:px-16 xl:px-36 2xl:px-60'
      }  relative z-10 bg-chalk ${classes}`}
      id={sectionId}
    >
      {children}
    </section>
  );
};
