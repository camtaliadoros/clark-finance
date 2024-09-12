import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type EmailWithIconProps = {
  colour: string;
};

export const EmailWithIcon = ({ colour }: EmailWithIconProps) => {
  return (
    <a
      className='inline-flex items-center space-x-1 link'
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
        className={`${
          colour === 'light' ? 'text-chalk' : 'text-ash'
        } hidden md:block`}
      >
        info@clark.finance
      </p>
    </a>
  );
};
