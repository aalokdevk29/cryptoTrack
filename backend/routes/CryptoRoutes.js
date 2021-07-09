const express = require('express');

const { CryptoController } = require('../controllers');

const router = express.Router();

router.get('/', CryptoController.list);

module.exports = router;
