import { Button } from '../shared/Button';
import { ContactForm } from '../shared/ContactForm';

export const ContactUs = () => {
  return (
    <section className='bg-chequered-bg bg-cover bg-bottom lg:px-36 py-16 flex items-start'>
      <ContactForm />
      <Button title='Book an appointment' colour='mediumblue' url='#' />
    </section>
  );
};
