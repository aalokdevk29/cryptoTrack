const express = require('express');

const { CryptoController } = require('../controllers');

const router = express.Router();

router.get('/', CryptoController.list);
router.get('/view', CryptoController.view);

module.exports = router;
