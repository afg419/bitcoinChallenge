"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypeValidator_1 = require("../../../api/TypeValidator");
class ExchangeRatesController {
    constructor(defaultMinutesBack, dbClient) {
        this.defaultMinutesBack = defaultMinutesBack;
        this.dbClient = dbClient;
    }
    indexExchangeRates(req, res, next) {
        let requestedMinutesBack = parseFloat(req.query.minutesBack);
        if (!TypeValidator_1.TypeValidator.validNumber(requestedMinutesBack)) {
            requestedMinutesBack = this.defaultMinutesBack;
        }
        let now = new Date();
        let start = new Date(now);
        start.setMinutes(now.getMinutes() - requestedMinutesBack);
        this.dbClient.getExchangesBetween(now, start).then(exchangeRates => {
            res.status(200).json(exchangeRates);
        }).catch(err => {
            console.error(err);
            res.status(500).json({ message: "Unexpected error has occurred" });
        });
    }
}
exports.ExchangeRatesController = ExchangeRatesController;
//# sourceMappingURL=ExchangeRatesController.js.map