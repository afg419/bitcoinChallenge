const bitcoinConversionRate = require('../models/bitcoinConversionRate')
const fetch = require('node-fetch')

function createBitcoinConversionRate(req, res, next) {
    fetch('https://btc-e.com/api/3/ticker/btc_usd-btc_rur')
        .then(function(res) {
            console.log(res)
            return res.text();
        }).then(function(body) {
        console.log(body);
        bitcoinConversionRate.create( { sourceName: "test source name" } )
    });

}

module.exports = {
    createBitcoinConversionRate: createBitcoinConversionRate
};



