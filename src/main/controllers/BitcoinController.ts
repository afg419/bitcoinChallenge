import {Router, Request, Response, NextFunction} from 'express';
import {TypeValidator} from "../../../api/TypeValidator";
import {DBClient} from "../db/clients/DBClient";
import {BitcoinAccount} from "../models/BitcoinAccount";
import {BitcoinClient} from "../bitcoind/BitcoinClient";

export class BitcoinController {
    private readonly dbClient: DBClient;
    private readonly bitcoinClient: BitcoinClient;

    constructor(dbClient: DBClient, bitcoinClient: BitcoinClient){
        this.dbClient = dbClient;
        this.bitcoinClient = bitcoinClient;
    }

    createAccount(req: Request, res: Response, next: NextFunction) {
        let accountName: string = req.query.accountName;
        if(!TypeValidator.validString(accountName)){
            res.status(500).json({message: "Request to create an address must include a valid address."})
            return;
        }

        this.bitcoinClient.createAccount(accountName)
            .then( createdAccount => {
                res.status(200).json(createdAccount);
                return;
            })
            .catch(err => {
                    console.error(err);
                    res.status(500).json({message: "Unexpected error has occurred while creating address"});
                    return;
            });
    }

    indexAddresses(req: Request, res: Response, next: NextFunction) {
        this.bitcoinClient.indexBitcoinAccounts().then(addresses => {
            res.status(200).json(addresses);
            return;
        }).catch(err => {
            console.error(err);
            res.status(500).json({message: "Unexpected error has occurred"});
            return;
        });
    }

    sendToAccount(req: Request, res: Response, next: NextFunction) {
        let amount: number = parseFloat(req.query.amount);
        let sourceAccount: string = req.query.source;
        let targetAddress: string = req.query.target;

        if(!TypeValidator.validString(sourceAccount) && !TypeValidator.validString(targetAddress) && !TypeValidator.validNumber(amount)){
            res.status(500).json({message: "Request to send btc must include valid amount, source account, and target address."});
            return;
        }

        this.bitcoinClient.sendToAddress(amount, sourceAccount, targetAddress);
    }
}