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
        type === 'wide' ? 'px-4 2xl:px-60' : ' px-4 md:px-16 lg:px-36 2xl:px-96'
      }  relative z-10 bg-chalk ${classes}`}
      id={sectionId}
    >
      {children}
    </section>
  );
};
