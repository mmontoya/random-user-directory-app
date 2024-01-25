import UserCard from '../components/UserCard';
import { useRouter } from 'next/router';
import usercard from '../styles/usercard.module.scss';
import userdetail from '../styles/userdetail.module.scss';
import Link from 'next/link';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const SEED = process.env.NEXT_PUBLIC_RANDOM_SEED;

const UserDetail = ({ users }) => {
  const router = useRouter();
  const id = router.query.id;

  const user = users.filter((user) => user.login.uuid === id)[0];

  return (
    <>
      <div className={usercard.userDetailContainer}>
        <UserCard user={user} />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Link className={userdetail.link} href={'/'}>
          &lt; back
        </Link>
      </div>
    </>
  );
};

export default UserDetail;

export async function getServerSideProps() {
  // Fetch the data from API
  const response = await fetch(`${BASE_URL}?results=10&seed=${SEED}&nat=US`);
  const data = await response.json();
  const users = data.results;

  // Pass the data as props to the component
  return {
    props: {
      users,
    },
  };
}
