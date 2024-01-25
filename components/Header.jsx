import header from '../styles/header.module.scss';

const Header = ({ onlineStatus }) => {
  return (
    <div className={header.main}>
      <img
        src="images/AMEX_Logo.png"
        alt="Amex logo"
        width={'50px'}
        height={'50px'}
      />
      Random User Directory
      <div className={header.status}>
        <div
          className={header.lightIndicator}
          style={{
            backgroundColor: `${onlineStatus === 'offline' ? 'red' : 'limegreen'}`,
          }}
        >
          &nbsp;
        </div>
        {onlineStatus === 'offline' ? 'offline' : 'online'}
      </div>
    </div>
  );
};

export default Header;
