import { ButtonContentFields } from '@/util/models';
import { Button } from '../shared/Button';
import { ContactForm } from '../shared/ContactForm';
import { Section } from '../shared/Section';

type ContactUsContent = {
  title: string;
  cta: ButtonContentFields;
};

export const ContactUs = ({ title, cta }: ContactUsContent) => {
  return (
    <Section
      type='narrow'
      classes='bg-chequered-bg bg-cover bg-bottom lg:px-36 py-28 flex items-start '
    >
      <ContactForm title={title} />
      <Button
        title={cta.title}
        colour='mediumblue'
        url={cta.url}
        target={cta.target}
      />
    </Section>
  );
};
