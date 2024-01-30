import React from 'react';

import Link from 'next/link';
import UserListItem from './UserListItem';
import userlist from '../styles/Userlist.module.scss';

const UserList = ({ users, page }) => {
  //console.log('The requested page is: ', page);
  return (
    <>
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
    </>
  );
};

export default UserList;
