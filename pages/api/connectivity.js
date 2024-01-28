import internetAvailable from 'internet-available';

export default async function checkInternetConnectivity(req, res) {
  let result = null;
  try {
    await internetAvailable()
      .then(function () {
        result = true;
      })
      .catch(function () {
        result = false;
      });

    // res.status(200).json({ result: { status: 'offline' } });
  } catch (error) {
    res.status(500).json({ error });
  }

  result && res.status(200).json({ result: { status: 'online' } });
  res.status(200).json({ result: { status: 'offline' } });
}
