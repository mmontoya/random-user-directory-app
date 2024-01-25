import express from 'express';
import next from 'next';
import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';
import fetch from 'node-fetch';

dotenv.config();
const dev = process.env.NODE_ENV !== 'production';

const SEED = process.env.NEXT_PUBLIC_RANDOM_SEED;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

console.log('The API is at:', process.env.NEXT_PUBLIC_API_URL);

console.log('The seed is', process.env.NEXT_PUBLIC_RANDOM_SEED);

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // LOCAL CALLS

  server.get('/', (req, res) => {
    return app.render(req, res, '/index');
  });

  server.get('/users', (req, res) => {
    return app.render(req, res, '/userList');
  });

  server.get('/user-detail', (req, res) => {
    const id = req.query.id;

    return app.render(req, res, '/userDetail');
  });

  // API CALLS
  server.get('/api/users', (req, res) => {
    const users = [
      { id: 1, name: 'James' },
      { id: 2, name: 'Carl' },
      { id: 3, name: 'Nina' },
    ];

    res.status(200).json({ users });
  });

  server.get('/api/user/:id', async (req, res) => {
    const id = req.params.id;

    const url = `${BASE_URL}?results=10&seed=${SEED}&nat=US`;
    console.log('fetching from: ', url);

    const data = await fetch(url).then((data) => {
      return data.json();
    });

    const results =
      data.results.filter((user) => user.login.uuid === id)[0] ?? null;
    return res.status(200).json({ results });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
