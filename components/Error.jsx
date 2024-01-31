import error from '../styles/Error.module.scss';

export default function Error({ errorCode, errorMessage }) {
  return (
    <div className={error.errorContainer}>
      <div className={error.errorMessage}>
        <span className={error.errorCode}>{errorCode}</span>
        <span className={error.separator} />
        <span className={error.errorText}>{errorMessage}</span>
      </div>
    </div>
  );
}
