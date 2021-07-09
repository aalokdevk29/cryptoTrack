import axios from 'axios';

const fetchCryptoList = async (_limit, page) => {
  return await axios
    .get(
      `${process.env.REACT_APP_SERVER_URL}crypto/?_limit=${_limit}&page=${page}`
    )
    .then((response) => response.data)
    .catch((error) => console.log('error', error));
};

const fetchCryptoData = async (_id) => {
  return await axios
    .get(`${process.env.REACT_APP_SERVER_URL}crypto/view?_id=${_id}`)
    .then((response) => response.data)
    .catch((error) => console.log('error', error));
};
export default {
  fetchCryptoList,
  fetchCryptoData,
};
