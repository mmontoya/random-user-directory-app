// pages/index.js
import React from 'react';
import Layout from './layout';
import Users from './users';

import variables from '../styles/variables.module.scss';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const HomePage = ({ serverOnlineStatus, users }) => {
  //console.log('Server Status:', serverOnlineStatus);

  return (
    <Layout
      color={variables.primaryColor}
      bgcolor={variables.bgColor}
      serverOnlineStatus={serverOnlineStatus}
    >
      <Users users={users} />
    </Layout>
  );
};

export default HomePage;

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
