import Error from '../components/Error';

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../lang/${locale}.json`)).default,
    },
  };
}

export default function Custom404({ messages }) {
  // console.log('[404 Error] messages', messages);
  //console.log(`Building slug: ${slug}`);
  return (
    <div style={{ marginTop: '-100px' }}>
      <Error errorCode={404} errorMessage={messages.Error['404']} />
    </div>
  );
}
