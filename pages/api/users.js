/**
 *  This route retrieves all users from Random.me if we're online
 *  Otherwise it reads from a local JSON file
 */
import { getJsonData } from '../../utils/getJsonData';
import { checkInternetConnectivity } from '../../utils/checkInternetConnectivity';
import { getResolvedPath } from '../../utils/getResolvedPath';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const SEED = process.env.NEXT_PUBLIC_RANDOM_SEED;

export default async function handler(req, res) {
  try {
    // Check if the server has internet connectivity
    const isOnline = await checkInternetConnectivity();
    //console.log(`we are ${isOnline ? 'online' : 'offlline'}`);
    const url = `${BASE_URL}?results=10&seed=${SEED}&nat=US`;

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
          large: '/images/generic_user_lg.jpg',
          medium: '/images/generic_user_md.jpg',
          thumbnail: '/images/generic_user_thumb.jpg',
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
