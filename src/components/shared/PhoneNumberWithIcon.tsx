import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const PhoneNumberWithIcon = () => {
  return (
    <a href='tel:+442045182215' className='flex items-center space-x-1 link'>
      <FontAwesomeIcon icon={faPhone} size={'sm'} className='text-base h-4' />
      <p className='hidden md:block'>02045 182 215</p>
    </a>
  );
};
