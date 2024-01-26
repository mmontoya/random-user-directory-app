import React from 'react';
import page from '../styles/Layout.module.scss';
import Header from '../components/Header';

const Layout = ({ children, serverOnlineStatus }) => {
  return (
    <>
      <div className={page.pageWrapper}>
        <Header onlineStatus={serverOnlineStatus} />
        <div>{children}</div>
      </div>
    </>
  );
};

export default Layout;
