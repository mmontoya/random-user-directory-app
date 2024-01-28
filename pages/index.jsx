// pages/index.js
import React, { useState } from 'react';
import Layout from './layout';
import Users from './users';
import Pagination from '../components/Pagination';

import variables from '../styles/variables.module.scss';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PAGE_SIZE = +process.env.NEXT_PUBLIC_PAGE_SIZE || 10;
const BUTTON_MAX = process.env.NEXT_PUBLIC_PAGINATION_NUM_BUTTONS || 5;
const TOTAL_RECORDS = process.env.NEXT_PUBLIC_USER_RECORDS_TOTAL || 200;

const HomePage = ({ serverOnlineStatus, users, indexPage }) => {
  console.log('Server Status:', serverOnlineStatus);
  const [page, setPage] = useState(indexPage || 1);
  const [data, setData] = useState(users);

  const limit = +PAGE_SIZE; // how many records per page?
  const buttonMax = +BUTTON_MAX; // how many buttons on the paginator to display?
  const count = +TOTAL_RECORDS; // how many toral records to retrieve

  const totalPages = Math.ceil(count / limit);
  // check if we really need all the buttons?
  const numPagesToDisplay = totalPages > buttonMax ? buttonMax : totalPages;

  //console.log('The page is', page);
  //console.log('The users are:', data);

  return (
    <Layout
      color={variables.primaryColor}
      bgcolor={variables.bgColor}
      serverOnlineStatus={serverOnlineStatus}
    >
      <Users users={data} page={page} />

      {serverOnlineStatus == 'online' && (
        <Pagination
          pageNum={page}
          limit={limit}
          count={count}
          totalPages={totalPages}
          numPagesToDisplay={numPagesToDisplay}
          setPage={setPage}
          setData={setData}
        />
      )}
    </Layout>
  );
};

export default HomePage;

export async function getServerSideProps(req) {
  const { locale } = req;
  const page = req.query.page || 1;

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

    return {
      props: {
        serverOnlineStatus,
        users,
        messages: (await import(`../messages/${locale}.json`)).default,
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
