import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import UserListItem from '../components/UserListItem';
import userlist from '../styles/userlist.module.scss';

const UserList = ({ users, page }) => {
  //console.log('The requested page is: ', page);

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
                href={`/userDetail?id=${user.login.uuid}&page=${page}`}
                key={user.login.uuid}
              >
                <UserListItem user={user} page={page} />
              </Link>
            ))}
        </div>
      </main>
    </>
  );
};

export default UserList;
