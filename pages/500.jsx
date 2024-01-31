import Error from '../components/Error';

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../lang/${locale}.json`)).default,
    },
  };
}

export default function Custom500({ messages }) {
  // console.log('[500 Error] messages', messages);
  //console.log(`Building slug: ${slug}`);
  return (
    <div style={{ marginTop: '-100px' }}>
      <Error errorCode={500} errorMessage={messages.Error['500']} />
    </div>
  );
}
