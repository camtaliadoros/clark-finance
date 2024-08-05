type SectionProps = {
  type: string;
  children: React.ReactNode;
  classes: string;
};

export const Section = ({ children, type, classes }: SectionProps) => {
  return (
    <section
      className={`${
        type === 'wide' ? 'px-4 2xl:px-60' : 'px-16 lg:px-36 2xl:px-96'
      } py-28  ${classes}`}
    >
      {children}
    </section>
  );
};
