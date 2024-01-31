import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';

import './globals.scss';

export default function MyApp(props) {
  const router = useRouter();
  const { Component, pageProps } = props;

  // console.log('locale:', router.locale);
  return (
    <NextIntlClientProvider
      locale={router.locale}
      timeZone="America/New_York"
      messages={pageProps.messages}
      onError={(error) => {
        console.log('Missing message:', error);
      }}
    >
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}
