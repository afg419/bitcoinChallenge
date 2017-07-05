import {Router, Express, NextFunction} from "express";
import { ExchangeRatesController } from "./controllers/ExchangeRatesController";

export class ApplicationRouter {
    readonly expressRouter: Router;
    private readonly exchangeRatesController: ExchangeRatesController;

    constructor(expressRouter: Router, apiConfig: { indexExchangeRatesPath: string }, exchangeRatesController: ExchangeRatesController){
        this.expressRouter = expressRouter;
        this.exchangeRatesController = exchangeRatesController;

        expressRouter.get(
            apiConfig.indexExchangeRatesPath,
            (req, res, next) => exchangeRatesController.indexExchangeRates(req, res, next)
        )
    }
}