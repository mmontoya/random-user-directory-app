import React from 'react';
import pagination from '../styles/pagination.module.scss'; // Import your CSS file
import { fetchData } from '../utils/FetchData';

const BASE_URL = process.env.NEXT_PUBLIC_URL;

const EndLeftSVGIcon = () => (
  <svg
    width={10}
    height={10}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 12 16"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M1 1v14m8.336-.479-6.5-5.774a1 1 0 0 1 0-1.494l6.5-5.774A1 1 0 0 1 11 2.227v11.546a1 1 0 0 1-1.664.748Z"
    />
  </svg>
);

const LeftSVGIcon = () => (
  <svg
    width={10}
    height={10}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 6 10"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 1 1 5l4 4"
    />
  </svg>
);

const RightSVGIcon = () => (
  <svg
    width={10}
    height={10}
    className="w-3 h-3"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 6 10"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m1 9 4-4-4-4"
    />
  </svg>
);

const EndRightSVGIcon = () => (
  <svg
    width={10}
    height={10}
    className="w-3 h-3"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    transform="scale(-1 1)"
    viewBox="0 0 12 16"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M1 1v14m8.336-.479-6.5-5.774a1 1 0 0 1 0-1.494l6.5-5.774A1 1 0 0 1 11 2.227v11.546a1 1 0 0 1-1.664.748Z"
    />
  </svg>
);

const Pagination = ({
  pageNum,
  limit,
  count,
  totalPages,
  numPagesToDisplay,
  setPage,
  setData,
}) => {
  const handleClick = async (event, page) => {
    event.preventDefault();
    const url = `${BASE_URL}/api/users?page=${page}`;
    const data = await fetchData(url);
    setPage(page);
    setData(data);
  };

  let startPage = pageNum - Math.floor(numPagesToDisplay / 2);
  // set limits
  if (startPage < 1) startPage = 1;
  let endPage = startPage + numPagesToDisplay - 1;
  if (endPage > totalPages) endPage = totalPages;
  // Show next or previous?
  let hasPrevious = startPage > 1;
  let hasNext = endPage < totalPages;

  //console.log('[Pagination] is receiving page of: ', pageNum);

  return (
    <div className={pagination.paginationContainer}>
      <div className={pagination.countContainer}>
        <div className={pagination.count}>
          {`viewing records: ${(pageNum - 1) * limit + 1} - ${(pageNum - 1) * limit + parseInt(limit)} of ${count} total records`}
        </div>
        <div
          className={pagination.pageOf}
        >{`(page ${pageNum} of ${totalPages} total)`}</div>
      </div>

      <div>
        <nav className={pagination.navContainer} aria-label="Users navigation">
          <ul className={pagination.navList}>
            <li>
              <button
                type="button"
                id="returnToStart"
                aria-label="return to start"
                onClick={(e) => handleClick(e, 1)}
                className={`${pagination.pageButton} ${pagination.pageButtonFirst}`}
              >
                {<EndLeftSVGIcon />}
              </button>
            </li>

            {hasPrevious && (
              <li>
                <button
                  type="button"
                  id="navigateToPreviousPage"
                  aria-label="return to previous page"
                  onClick={(e) => handleClick(e, startPage - 1)}
                  className={pagination.pageButton}
                >
                  <LeftSVGIcon />
                  <span className={pagination.srOnly}>Previous</span>
                </button>
              </li>
            )}

            {Array.from(
              { length: endPage - startPage + 1 },
              (_, index) => index + startPage
            ).map((page) => (
              <li key={page}>
                <button
                  type="button"
                  id={`navigateToSelectedPage_${page}`}
                  aria-label={`go to page${page}`}
                  onClick={(e) => handleClick(e, page)}
                  href={`/api/users?page=${page}`}
                  className={
                    page == pageNum
                      ? pagination.highlightedPage
                      : pagination.pageButton
                  }
                >
                  {page}
                </button>
              </li>
            ))}

            {hasNext && (
              <li>
                <button
                  type="button"
                  id="navigateToNextPage"
                  aria-label="advance to next page"
                  onClick={(e) => handleClick(e, endPage + 1)}
                  className={pagination.pageButton}
                >
                  <span className={pagination.srOnly}>Next</span>
                  <RightSVGIcon />
                </button>
              </li>
            )}

            <li>
              <button
                type="button"
                id="goToEnd"
                aria-label="go to last page"
                onClick={(e) => handleClick(e, totalPages)}
                className={`${pagination.pageButton} ${pagination.pageButtonLast}`}
              >
                <EndRightSVGIcon />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
