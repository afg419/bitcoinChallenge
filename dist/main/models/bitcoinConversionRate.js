const mongoose = require('mongoose');
const BitcoinConverstionRateSchema = new mongoose.Schema({
    sourceName: {
        type: String
    },
}, { minimize: false, timestamps: true });
BitcoinConverstionRateSchema.methods.returnTwo = function (nextCallback) {
    return nextCallback(2);
};
const BitcoinConversionRate = mongoose.model("BitcoinConversionRate", BitcoinConverstionRateSchema);
module.exports = BitcoinConversionRate;
//# sourceMappingURL=bitcoinConversionRate.js.map