import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import UserListItem from '../components/UserListItem';
import userlist from '../styles/userlist.module.scss';

const Home = ({ users }) => {
  return (
    <>
      <Head>
        <title>Amex User Directory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={userlist.userListContainer}>
          {users &&
            users.map((user) => (
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

export default Home;

// export async function getServerSideProps() {
//   const url = 'http://localhost:3000/api/users';
//   const options = {};

//   return {
//     props: {
//       users: await fetchData(url, options),
//     },
//   };
// }
