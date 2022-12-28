import axios from 'axios';

export const api = async (url) => {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    return false;
  }
};
