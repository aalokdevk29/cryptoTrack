const { default: axios } = require('axios');

/*
--------------------------------
    API to fetch crypto data
-------------------------------
*/
const list = async (req, res) => {
  try {
    const { query } = req;
    const { _limit, page } = query;
    let config = {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.API_KEY,
      },
      json: true,
    };
    const start = _limit * (page - 1) === 0 ? 1 : _limit * (page - 1);

    await axios
      .get(
        `${process.env.LIST_API_URL}?start=${start}&limit=${_limit}&convert=USD`,
        config
      )
      .then((response) => {
        return res.status(200).json({
          responseCode: 200,
          success: true,
          message: 'Crypto data fetched successfully',
          data: response.data.data,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err.message,
        });
      });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

/*
------------------------------------
    API to fetch crypto data by id
-----------------------------------
*/
const view = async (req, res) => {
  try {
    const { query } = req;
    const { _id } = query;

    let config = {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.API_KEY,
      },
      json: true,
    };

    await axios
      .get(`${process.env.INFO_API_URL}?id=${_id}`, config)
      .then((response) => {
        return res.status(200).json({
          responseCode: 200,
          success: true,
          message: 'Crypto data fetched successfully',
          data: response.data.data,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err.message,
        });
      });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { list, view };
