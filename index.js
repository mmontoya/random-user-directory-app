import express from 'express';
import next from 'next';
import dotenv from 'dotenv';
//import asyncHandler from 'express-async-handler';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const basePathToData = path.join(__dirname, '/data');

const getJsonData = (basePathToData, filename) => {
  let url = path.join(basePathToData, filename);
  return JSON.parse(fs.readFileSync(url, 'utf-8'));
};

const checkInternetConnectivity = async () => {
  try {
    const response = await fetch('https://www.google.com', { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
};

dotenv.config();
const dev = process.env.NODE_ENV !== 'production';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const SEED = process.env.NEXT_PUBLIC_RANDOM_SEED;

console.log('The API is at:', process.env.NEXT_PUBLIC_API_URL);
console.log('The seed is', process.env.NEXT_PUBLIC_RANDOM_SEED);

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(async (req, res, next) => {
    try {
      // Check if the server has internet connectivity
      const isOnline = await checkInternetConnectivity();
      res.setHeader('X-Online-Status', isOnline ? 'online' : 'offline');
      next();
    } catch (error) {
      console.error('Error checking online status:', error);
      res.setHeader('X-Online-Status', 'unknown');
      next();
    }
  });

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

  server.get('/api/users', async (req, res) => {
    try {
      // Check if the server has internet connectivity
      const isOnline = await checkInternetConnectivity();
      const url = `${BASE_URL}?results=10&seed=${SEED}&nat=US`;

      if (isOnline) {
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;
        res.status(200).json(results);
      } else {
        const { results } = await getJsonData(basePathToData, 'data.json');
        const noavatar = results.map((user) => ({
          ...user,
          picture: {
            large: '/images/generic_user_lg.jpg',
            medium: '/images/generic_user_md.jpg',
            thumbnail: '/images/generic_user_thumb.jpg',
          },
        }));
        //console.log(noavatar);
        res.status(200).json(noavatar);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
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
