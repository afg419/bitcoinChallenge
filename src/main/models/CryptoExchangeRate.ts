import {Currency} from "../../../api/Currency";
import { Document, Schema, Model, model} from "mongoose";
import {TypeValidator} from "../../../api/TypeValidator";
import {ICryptoExchangeRate} from "../../../api/ICryptoExchangeRate";

export class CryptoExchangeRate extends ICryptoExchangeRate {
    constructor(date: Date, source: Currency, target: Currency, rate: number, apiName: string){
        super(date, source, target, rate, apiName);
    }
}