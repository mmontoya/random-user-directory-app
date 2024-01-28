/**
 *  This route retrieves all users from Random.me if we're online
 *  Otherwise it reads from a local JSON file
 */
import { getJsonData } from '../../utils/getJsonData';
//import { checkInternetConnectivity } from '../../utils/checkInternetConnectivity';
import { getResolvedPath } from '../../utils/getResolvedPath';

const API_URL = process.env.API_URL;
const BASE_URL = process.env.BASE_URL;
const SEED = process.env.RANDOM_SEED;
const PAGE_SIZE = +process.env.NEXT_PUBLIC_PAGE_SIZE || 10;

export default async function handler(req, res) {
  try {
    // Check if the server has internet connectivity
    const response = await fetch(`${BASE_URL}/api/connectivity`);
    const data = await response.json();
    const results = data.result;

    //console.log(results);

    const isOnline = results.status === 'online';

    //console.log(`we are ${isOnline ? 'online' : 'offlline'}`);
    const page = req.query.page || 1;

    console.log('[Users API Server Handler] received request for page: ', page);

    const url = `${API_URL}?results=${PAGE_SIZE}&seed=${SEED}&nat=US&page=${page}`;

    if (isOnline) {
      const response = await fetch(url);
      const data = await response.json();
      const results = data.results;
      //console.log('results: ', results);
      res.setHeader('X-Online-Status', 'online').status(200).json(results);
    } else {
      const { results } = await getJsonData(
        getResolvedPath('/data'),
        'data.json'
      );
      //console.log('The result is', results);
      const noavatar = await results.map((user) => ({
        ...user,
        picture: {
          large: '/static/images/generic_user_lg.jpg',
          medium: '/static/images/generic_user_md.jpg',
          thumbnail: '/static/images/generic_user_thumb.jpg',
        },
      }));
      //console.log(noavatar);
      res.setHeader('X-Online-Status', 'offline').status(200).json(noavatar);
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    res
      .setHeader('X-Online-Status', 'unknown')
      .status(500)
      .json({ error: 'Internal Server Error' });
  }
}
