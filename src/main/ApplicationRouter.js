"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApplicationRouter {
    constructor(expressRouter, apiConfig, exchangeRatesController) {
        console.log("why are they already making me!");
        this.expressRouter = expressRouter;
        this.exchangeRatesController = exchangeRatesController;
        expressRouter.get(apiConfig.indexExchangeRatesPath, (req, res, next) => exchangeRatesController.indexExchangeRates(req, res, next));
    }
}
exports.ApplicationRouter = ApplicationRouter;
//# sourceMappingURL=ApplicationRouter.js.map