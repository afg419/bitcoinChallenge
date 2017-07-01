import {Router, Request, Response, NextFunction} from 'express';
import {TypeValidator} from "../util/TypeValidator";
import {DBClient} from "../db/clients/DBClient";

export class ExchangeRatesController {
    private readonly defaultMinutesBack: number;
    private readonly dbClient: DBClient;

    constructor(defaultMinutesBack: number, dbClient: DBClient){
        this.defaultMinutesBack = defaultMinutesBack;
        this.dbClient = dbClient;
    }

    indexExchangeRates(req: Request, res: Response, next: NextFunction) {
        // console.log(req)
        // console.log(req.query);
        let requestedMinutesBack: number = parseFloat(req.query.minutesBack);
        if(!TypeValidator.validNumber(requestedMinutesBack)){
            requestedMinutesBack = this.defaultMinutesBack;
        }

        let now: Date = new Date();
        let start: Date = new Date(now);
        start.setMinutes(now.getMinutes() - requestedMinutesBack);

        this.dbClient.getExchangesBetween(now, start).then(exchangeRates => {
            res.status(200).json(exchangeRates);
        }).catch(err => {
            console.error(err);
            res.status(500).json({message: "Unexpected error has occurred"});
        });
    }
}