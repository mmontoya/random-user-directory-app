import header from '../styles/header.module.scss';
import { useTranslations } from 'next-intl';

const Header = ({ onlineStatus }) => {
  const t = useTranslations('Header');
  return (
    <div className={header.main}>
      <img
        src="images/AMEX_Logo.png"
        alt="Amex logo"
        width={'50px'}
        height={'50px'}
      />
      <h1 className={header.title}>{t('title')}</h1>
      <div className={header.status}>
        <div
          className={header.lightIndicator}
          style={{
            backgroundColor: `${onlineStatus === 'online' ? 'limegreen' : 'red'}`,
          }}
        >
          &nbsp;
        </div>
        {onlineStatus === 'online' ? 'online' : 'offline'}
      </div>
    </div>
  );
};

export default Header;

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
    },
  };
}
