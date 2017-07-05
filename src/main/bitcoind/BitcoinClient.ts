import {BitcoinConfig} from "../config/BitcoinConfig";
import {BitcoinAccount} from "../models/BitcoinAccount";
let bitcoin = require('bitcoin');
const CoinbaseClient = require('coinbase').Client;



export class BitcoinClient {
    private readonly client;

    constructor(coinbaseConfig: { apiKey: string, apiSecret: string}){
        this.client = new CoinbaseClient({'apiKey': coinbaseConfig.apiKey, 'apiSecret': coinbaseConfig.apiSecret});
        this.client.getAccounts({}, (err, accounts) => {
            console.log("err:" + err)
            console.log(accounts)
        });
    }

    createAccount(account: string): Promise<BitcoinAccount> {
        return this.client.cmd('getaccountaddress', account, function(err, accountAddress, resHeaders) {
            if (err){console.error(err)};
            console.log('AccountAddress:', accountAddress);
        });
    }

    sendToAddress(amount: number, sourceAddress: string, targetAddress: string): Promise<void> {
        return this.client.cmd('sendfrom', sourceAddress, targetAddress, amount, 6, function(err, repl, resHeaders){
            if (err) return console.log(err);
            console.log('Send repl:', repl);
        });
    }

    getBalance(address: string): Promise<number> {
        return this.client.getBalance(address, 6, function(err, balance, resHeaders) {
            if (err) return console.log(err);
            console.log('Balance:', balance);
        });
    }

    indexBitcoinAccounts(): Promise<BitcoinAccount[]>{
        return this.client.cmd('listreceivedbyaccount', 0, true, function(err, accounts, resHeaders) {
            if (err) return console.log(err);
            console.log('Accounts:', accounts);
        });
    }
}