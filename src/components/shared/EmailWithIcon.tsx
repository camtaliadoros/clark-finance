import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type EmailWithIconProps = {
  colour: string;
  hideOnMobile: boolean;
};

export const EmailWithIcon = ({ colour, hideOnMobile }: EmailWithIconProps) => {
  return (
    <a
      className='inline-flex items-center space-x-1 link mb-0'
      href='mailto:info@clark.finance'
    >
      <FontAwesomeIcon
        icon={faEnvelope}
        size={'sm'}
        className={`${
          colour === 'light' ? 'text-chalk' : 'text-ash'
        } text-base h-4`}
      />
      <p
        className={`mb-0 ${colour === 'light' ? 'text-chalk' : 'text-ash'} ${
          hideOnMobile ? 'hidden' : 'block'
        }  md:block`}
      >
        info@clark.finance
      </p>
    </a>
  );
};
