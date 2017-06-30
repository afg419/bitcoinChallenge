import {Currency} from "../core/Currency";
import {isNullOrUndefined} from "util";
import { Document, Schema, Model, model} from "mongoose";
import {Double} from "bson";
import Doc = Mocha.reporters.Doc;

export class CryptoExchangeRate {
    date: Date;
    source: Currency;
    target: Currency;
    rate: number;

    constructor(date: Date, source: Currency, target: Currency, rate: number){
        this.date = date;
        this.source = source;
        this.target = target;
        this.rate = rate;
    }

    public valid(): boolean {
        return !(   isNullOrUndefined(this.date)   ||
                    isNullOrUndefined(this.source) ||
                    isNullOrUndefined(this.target) ||
                    isNullOrUndefined(this.rate)        )
    }
}

let CryptoExchangeRateSchema: Schema = new Schema({
    date: Date,
    source: String,
    target: String,
    rate: Number
}, {timestamps: true});

type CryptoExchangeType = CryptoExchangeRate & Document
export const ExchangeDao: Model<CryptoExchangeType> = model<CryptoExchangeType>("CryptoExchangeRate", CryptoExchangeRateSchema);