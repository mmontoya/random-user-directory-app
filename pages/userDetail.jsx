import UserCard from '../components/UserCard';
import { useRouter } from 'next/router';
import usercard from '../styles/usercard.module.scss';
import userdetail from '../styles/userdetail.module.scss';
import Link from 'next/link';
import Layout from './layout';
import { useTranslations } from 'next-intl';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const UserDetail = ({ serverOnlineStatus, users, messages }) => {
  const t = useTranslations('UserDetail');
  const router = useRouter();
  const id = router.query.id;
  const user = users.filter((user) => user.login.uuid === id)[0];

  return (
    <Layout serverOnlineStatus={serverOnlineStatus}>
      <div className={usercard.userDetailContainer}>
        <UserCard user={user} />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Link className={userdetail.link} href={'/'}>
          &lt; {t('button')}
        </Link>
      </div>
    </Layout>
  );
};

export default UserDetail;

export async function getServerSideProps({ locale }) {
  try {
    const url = `${BASE_URL}/api/users`;
    const response = await fetch(url);
    const serverStatusHeader = response.headers.get('X-Online-Status');
    const serverOnlineStatus = serverStatusHeader || 'unknown';
    const users = await response.json();

    console.log('Request Online Status Header:', serverStatusHeader);

    return {
      props: {
        serverOnlineStatus,
        users,
        messages: (await import(`../messages/${locale}.json`)).default,
      },
    };
  } catch (error) {
    console.log('Server error getting connectivity');
    return {
      props: {
        serverOnlineStatus: 'unknown',
      },
    };
  }
}
