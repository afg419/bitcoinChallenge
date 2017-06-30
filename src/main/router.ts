import { Router, Express } from "express";



let express = require('express');
let router: Router = express.Router();
let controller = require('./controllers/controller');
let bitcoinConversionRatesController = require('./controllers/bitcoinConversionRates');

router.get('/places', controller.getPlaces);
router.get('/testDb', bitcoinConversionRatesController.createBitcoinConversionRate);

export = router;