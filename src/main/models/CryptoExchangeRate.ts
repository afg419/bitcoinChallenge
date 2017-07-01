import {Currency} from "../../../api/Currency";
import { Document, Schema, Model, model} from "mongoose";
import {TypeValidator} from "../util/TypeValidator";

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
        return TypeValidator.validDate(this.date)   &&
               TypeValidator.validCurrency(this.source) &&
               TypeValidator.validCurrency(this.target) &&
               TypeValidator.validNumber(this.rate)   &&
               TypeValidator.validString(this.apiName)
    }
}