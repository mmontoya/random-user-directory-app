export default async function handler(req, res) {
  console.log(req);
  const header = req.rawHeaders[1].split(':');
  const url = header[0];
  const port = header[1];
  res
    .status(200)
    .json({ msg: `Request received from ${url}${port && `:${port}`}` });
}
