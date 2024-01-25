import header from '../styles/header.module.scss';
const Header = () => {
  return (
    <div className={header.main}>
      <img
        src="images/AMEX_Logo.png"
        alt="Amex logo"
        width={'50px'}
        height={'50px'}
      />
      Random User Directory
    </div>
  );
};

export default Header;
