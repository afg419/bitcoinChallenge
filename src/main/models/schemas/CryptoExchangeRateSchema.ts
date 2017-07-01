import { Document, Schema, Model, model} from "mongoose";
import {CryptoExchangeRate} from "../CryptoExchangeRate";

let CryptoExchangeRateSchema: Schema = new Schema({
    date: Date,
    source: String,
    target: String,
    rate: Number,
    apiName: String
}, {timestamps: true});

type CryptoExchangeType = CryptoExchangeRate & Document
export const ExchangeDao: Model<CryptoExchangeType> = model<CryptoExchangeType>("CryptoExchangeRate", CryptoExchangeRateSchema);