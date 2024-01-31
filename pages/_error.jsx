import ErrorComponent from '../components/Error';

function Error({ statusCode }) {
  const errorMessage = statusCode
    ? 'An error occurred on the server'
    : 'An error occurred on the client';

  return (
    <ErrorComponent
      errorCode={statusCode}
      errorMessage={errorMessage}
    ></ErrorComponent>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
