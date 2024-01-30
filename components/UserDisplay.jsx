import React, { useState } from 'react';
import UserList from './UserList';
import Pagination from './Pagination';
import Head from 'next/head';
import { useTranslations } from 'next-intl';

const PAGE_SIZE = +process.env.NEXT_PUBLIC_PAGE_SIZE || 10;
const BUTTON_MAX = process.env.NEXT_PUBLIC_PAGINATION_NUM_BUTTONS || 5;
const TOTAL_RECORDS = process.env.NEXT_PUBLIC_USER_RECORDS_TOTAL || 200;

const UserPage = ({ serverOnlineStatus, users, indexPage }) => {
  const t = useTranslations('Tab');

  console.log('Tab title from', t('title'));

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
    <>
      <Head>
        <title>{t('title')}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <UserList users={data} page={page} />
        {serverOnlineStatus == 'online' && (
          <>
            <Pagination
              pageNum={page}
              limit={limit}
              count={count}
              totalPages={totalPages}
              numPagesToDisplay={numPagesToDisplay}
              setPage={setPage}
              setData={setData}
            />
          </>
        )}
      </main>
    </>
  );
};

export default UserPage;
