import Head from 'next/head';
import Link from 'next/link';
import UserListItem from '../components/UserListItem';
import userlist from '../styles/userlist.module.scss';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const SEED = process.env.NEXT_PUBLIC_RANDOM_SEED;

const Home = ({ users, info }) => {
  console.log('Base Url is:', BASE_URL);
  console.log('seed is:', info.seed);

  return (
    <>
      <Head>
        <title>Amex User Directory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={userlist.userListContainer}>
          {users.map((user) => (
            <Link
              href={`/userDetail?id=${user.login.uuid}`}
              key={user.login.uuid}
            >
              <UserListItem user={user} />
            </Link>
          ))}
        </div>
      </main>
    </>
  );
};

export async function getServerSideProps() {
  // Fetch the data from API
  const response = await fetch(`${BASE_URL}?results=10&seed=${SEED}&nat=US`);
  const data = await response.json();
  const users = data.results;
  const info = data.info;

  // Pass the data as props to the component

  return {
    props: {
      users,
      info,
    },
  };
}

export default Home;
