import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';

import '../global.scss';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // console.log('locale:', router.locale);

  return (
    <NextIntlClientProvider
      locale={router.locale}
      timeZone="America/New_York"
      messages={pageProps.messages}
    >
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}
