import { Button } from '../shared/Button';
import { ContactForm } from '../shared/ContactForm';
import { EmailWithIcon } from '../shared/emailWithIcon';
import { PhoneNumberWithIcon } from '../shared/PhoneNumberWithIcon';
import { Section } from '../shared/Section';
import { SectionTitle } from '../shared/SectionTitle';

type ContactUsContent = {
  contact_section_title: string;
  book_appointment_label: BookAppointmentContent;
};

type BookAppointmentContent = {
  title: string;
  url: string;
  target?: string;
};

type ContactUsProps = {
  colourScheme: string;
};

async function fetchContactUsContent() {
  const res = await fetch(`${process.env.HOST_URL}/contact-us/api`, {
    next: {
      revalidate: 10,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export const ContactUs = async ({ colourScheme }: ContactUsProps) => {
  const contactUsData = await fetchContactUsContent();

  const content: ContactUsContent = contactUsData.acf;

  return (
    <Section
      type='narrow'
      classes={`${
        colourScheme === 'light' ? 'bg-chequered-bg' : 'bg-building-detail'
      } bg-cover bg-bottom space-y-12`}
    >
      <SectionTitle
        title={content.contact_section_title}
        textColour={colourScheme === 'light' ? 'ash' : 'chalk'}
        lineColour={colourScheme === 'light' ? 'mediumblue' : 'chalk'}
        alignment='centred'
      />
      <div className='flex flex-col md:grid md:grid-cols-2 items-start space-y-12 md:space-y-0 gap-12'>
        <ContactForm />
        <div className='flex flex-col items-start gap-6 '>
          <Button
            title={content.book_appointment_label.title}
            colour={colourScheme === 'light' ? 'mediumblue' : 'chalk'}
            url={content.book_appointment_label.url}
            target={content.book_appointment_label.target}
            classes='w-full md:w-fit md:justify-self-center'
          />
          <EmailWithIcon colour='light' />
          <PhoneNumberWithIcon colour='light' />
        </div>
      </div>
    </Section>
  );
};
