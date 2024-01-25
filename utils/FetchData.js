import offlineusers from '../data/data.json';
const noavatar = offlineusers.results.map((user) => ({
  ...user,
  picture: {
    large: '/images/generic_user_lg.jpg',
    medium: '/images/generic_user_md.jpg',
    thumbnail: '/images/generic_user_thumb.jpg',
  },
}));

export const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
