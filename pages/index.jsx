import Layout from './layout';
import UserDisplay from '../components/UserDisplay';
import variables from '../styles/Variables.module.scss';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Home = ({ serverOnlineStatus, users, indexPage }) => {
  return (
    <Layout
      color={variables.primaryColor}
      bgcolor={variables.bgColor}
      serverOnlineStatus={serverOnlineStatus}
    >
      <UserDisplay
        users={users}
        indexPage={indexPage}
        serverOnlineStatus={serverOnlineStatus}
      />
    </Layout>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const { locale } = context;
  const page = context.query.page || 1;

  const indexPage = page;

  console.log('[Index] The requested page is:', page);

  try {
    const url = `${BASE_URL}/api/users?page=${page}`;
    const response = await fetch(url);
    const serverStatusHeader = response.headers.get('X-Online-Status');
    const serverOnlineStatus = serverStatusHeader || 'unknown';
    const users = await response.json();

    console.log(
      '[Index Server Props] Online Status Header:',
      serverStatusHeader
    );

    // While not used by <Home /> messages are required by the header
    return {
      props: {
        serverOnlineStatus,
        users,
        messages: (await import(`../lang/${locale}.json`)).default,
        indexPage,
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
