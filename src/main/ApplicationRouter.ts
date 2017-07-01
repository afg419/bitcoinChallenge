import {Router, Express, NextFunction} from "express";
import { ExchangeRatesController } from "./controllers/ExchangeRatesController";

export class ApplicationRouter {
    readonly expressRouter: Router;
    private readonly exchangeRatesController: ExchangeRatesController;

    constructor(expressRouter: Router, paths: { indexExchangeRatesPath: string }, exchangeRatesController: ExchangeRatesController){
        console.log("why are they already making me!");
        this.expressRouter = expressRouter;
        this.exchangeRatesController = exchangeRatesController;

        expressRouter.get(
            paths.indexExchangeRatesPath,
            (req, res, next) => exchangeRatesController.indexExchangeRates(req, res, next)
        )
    }
}