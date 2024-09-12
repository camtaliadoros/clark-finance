import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type PhoneNumberWithIconProps = {
  colour: string;
};

export const PhoneNumberWithIcon = ({ colour }: PhoneNumberWithIconProps) => {
  return (
    <a href='tel:+442045182215' className='flex items-center space-x-1 link'>
      <FontAwesomeIcon
        icon={faPhone}
        size={'sm'}
        className={`${
          colour === 'light' ? 'text-chalk' : 'text-ash'
        } text-base h-4`}
      />
      <p
        className={`${
          colour === 'light' ? 'text-chalk' : 'text-ash'
        } hidden md:block`}
      >
        02045 182 215
      </p>
    </a>
  );
};
