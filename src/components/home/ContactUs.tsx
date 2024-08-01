import { Button } from '../shared/Button';
import { ContactForm } from '../shared/ContactForm';

export const ContactUs = () => {
  return (
    <section className='bg-chequered-bg px-36 py-16 flex'>
      <ContactForm />
      <Button title='Book an appointment' colour='mediumblue' url='#' />
    </section>
  );
};
