const express = require('express');

const CryptoRoutes = require('./CryptoRoutes');

const router = express.Router();

router.use('/crypto', CryptoRoutes);

module.exports = router;
