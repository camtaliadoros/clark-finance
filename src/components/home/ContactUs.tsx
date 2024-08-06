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
    <Section type='narrow' classes='bg-chequered-bg bg-cover bg-bottom   '>
      <h3 className='text-2xl text-ash mb-8'>{title}</h3>
      <div className='flex flex-col md:grid md:grid-cols-2 items-start space-y-12 md:space-y-0'>
        <ContactForm title={title} />
        <Button
          title={cta.title}
          colour='mediumblue'
          url={cta.url}
          target={cta.target}
          classes='w-full md:w-fit md:justify-self-center'
        />
      </div>
    </Section>
  );
};
