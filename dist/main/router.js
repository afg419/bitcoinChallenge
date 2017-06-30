"use strict";
let express = require('express');
let router = express.Router();
let controller = require('./controllers/controller');
let bitcoinConversionRatesController = require('./controllers/bitcoinConversionRates');
router.get('/places', controller.getPlaces);
router.get('/testDb', bitcoinConversionRatesController.createBitcoinConversionRate);
module.exports = router;
//# sourceMappingURL=router.js.map