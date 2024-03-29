import UserCard from '../components/UserCard';
import { useRouter } from 'next/router';
import usercard from '../styles/Usercard.module.scss';
import userdetail from '../styles/Userdetail.module.scss';
import Link from 'next/link';
import Layout from './layout';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const UserDetail = ({ serverOnlineStatus, users }) => {
  const t = useTranslations('UserDetail');
  const router = useRouter();
  const id = router.query.id;
  const page = router.query.page;

  const user = users.filter((user) => user.login.uuid === id)[0];

  //console.log('[User Detail] query params page:', page);

  return (
    <Layout serverOnlineStatus={serverOnlineStatus}>
      <Head>
        <title>{`${t('user')}: ${user.name.first} ${user.name.last}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={usercard.userDetailContainer}>
        <UserCard user={user} />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Link
          className={userdetail.link}
          href={`/?page=${page}`}
          id={'backButton'}
        >
          &lt; {t('button')}
        </Link>
      </div>
    </Layout>
  );
};

export default UserDetail;

export async function getServerSideProps(req) {
  const page = req.query.page;

  const { locale } = req;

  //console.log('The page', page);

  try {
    const url = `${BASE_URL}/api/users?page=${page}`;
    const response = await fetch(url);
    const serverStatusHeader = response.headers.get('X-Online-Status');
    const serverOnlineStatus = serverStatusHeader || 'unknown';
    const users = await response.json();

    console.log(
      '[User Detail] Request Online Status Header:',
      serverStatusHeader
    );

    return {
      props: {
        serverOnlineStatus,
        users,
        messages: (await import(`../lang/${locale}.json`)).default,
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
