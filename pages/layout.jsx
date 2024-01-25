import page from '../styles/layout.module.scss';
import Header from '../components/Header';

const Layout = ({ children }) => {
  return (
    <>
      <div className={page.pageWrapper}>
        <Header />
        <div>{children}</div>
      </div>
    </>
  );
};

export default Layout;
