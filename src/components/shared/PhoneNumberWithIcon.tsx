import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type PhoneNumberWithIconProps = {
  colour: 'light' | 'dark';
  size: 'sm' | 'lg';
  hideOnMobile: boolean;
};

export const PhoneNumberWithIcon = ({
  colour,
  size,
  hideOnMobile,
}: PhoneNumberWithIconProps) => {
  return (
    <a 
      href='tel:+442045182215' 
      className='flex items-center space-x-1 link '
      aria-label='Call us at 02045 182 215'
    >
      <FontAwesomeIcon
        icon={faPhone}
        size={'sm'}
        className={`${colour === 'light' ? 'text-chalk' : 'text-ash'} ${
          size === 'sm' ? 'text-base' : 'text-2xl'
        } h-4`}
      />
      <p
        className={`mb-0 ${colour === 'light' ? 'text-chalk' : 'text-ash'} ${
          hideOnMobile ? 'hidden' : 'block'
        } md:block`}
      >
        02045 182 215
      </p>
    </a>
  );
};
