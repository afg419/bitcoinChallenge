var express = require('express');
var router = express.Router();
var controller = require('./controllers/controller');
var bitcoinConversionRatesController = require('./controllers/bitcoinConversionRates');

router.get('/places', controller.getPlaces);
router.get('/testDb', bitcoinConversionRatesController.createBitcoinConversionRate);

module.exports = router;