import {Currency} from "../core/Currency";
import {isNullOrUndefined} from "util";
import { Document, Schema, Model, model} from "mongoose";
import {Double} from "bson";
import Doc = Mocha.reporters.Doc;

export class CryptoExchangeRate {
    readonly date: Date;
    readonly source: Currency;
    readonly target: Currency;
    readonly rate: number;
    readonly apiName: string;

    constructor(date: Date, source: Currency, target: Currency, rate: number, apiName: string){
        this.date = date;
        this.source = source;
        this.target = target;
        this.rate = rate;
        this.apiName = apiName
    }

    public valid(): boolean {
        return !(   isNullOrUndefined(this.date)   ||
                    isNullOrUndefined(this.source) ||
                    isNullOrUndefined(this.target) ||
                    isNullOrUndefined(this.rate)   ||
                    isNullOrUndefined(this.apiName)
        )
    }
}

let CryptoExchangeRateSchema: Schema = new Schema({
    date: Date,
    source: String,
    target: String,
    rate: Number,
    apiName: String
}, {timestamps: true});

type CryptoExchangeType = CryptoExchangeRate & Document
export const ExchangeDao: Model<CryptoExchangeType> = model<CryptoExchangeType>("CryptoExchangeRate", CryptoExchangeRateSchema);