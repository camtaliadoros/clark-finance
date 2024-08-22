import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const EmailWithIcon = () => {
  return (
    <a
      className='inline-flex items-center space-x-1 link'
      href='mailto:info@clark.finance'
    >
      <FontAwesomeIcon
        icon={faEnvelope}
        size={'sm'}
        className='text-base h-4'
      />
      <p className='hidden md:block'>info@clark.finance</p>
    </a>
  );
};
