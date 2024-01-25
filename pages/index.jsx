// pages/index.js
import React from 'react';
import Layout from './layout';
import Home from './home';

const HomePage = ({ serverOnlineStatus, users }) => {
  console.log('The status', serverOnlineStatus);
  return (
    <Layout serverOnlineStatus={serverOnlineStatus}>
      <Home users={users} />
    </Layout>
  );
};

export default HomePage;

export async function getServerSideProps() {
  try {
    const response = await fetch('http://localhost:3000/api/users');
    const serverStatusHeader = response.headers.get('X-Online-Status');
    const serverOnlineStatus = serverStatusHeader || 'unknown';

    const users = await response.json();

    return {
      props: {
        serverOnlineStatus,
        users,
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
