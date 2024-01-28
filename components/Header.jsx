import header from '../styles/header.module.scss';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

// Note: Messages used for Intl are provided by parent index page

const Header = (props) => {
  const { onlineStatus } = props;
  const g = useTranslations();
  const t = useTranslations('Header');
  const locale = g('locale');

  console.log('Locale is: ', locale);

  return (
    <div className={header.main}>
      <Image
        src="/static/images/AMEX_Logo.png"
        alt="Amex logo"
        width={50}
        height={50}
      />
      <h1 className={header.title}>{t('title')}</h1>

      <div className={header.flag}>
        <Image
          src={`/${locale}/images/flag.png`}
          alt="flag icon"
          height={22}
          width={30}
        />
      </div>
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
