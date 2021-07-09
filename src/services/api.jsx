import axios from 'axios';

let config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    CMC_PRO_API_KEY: process.env.REACT_APP_API_KEY,
  },
};

const fetchCryptoList = async () => {
  return await axios
    .get(
      `${process.env.REACT_APP_API_URL}?start=0&limit=10&convert=USD`,
      config
    )
    .then((response) => response.data)
    .catch((error) => console.log('error', error));
};

export default {
  fetchCryptoList,
};
