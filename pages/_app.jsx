import { useEffect } from 'react';

import Layout from './layout';
import variables from '../styles/variables.module.scss';
import '../global.scss';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.warn = () => {};
  }, []);

  return (
    <Layout color={variables.primaryColor} bgcolor={variables.bgColor}>
      <Component {...pageProps} />
    </Layout>
  );
}
