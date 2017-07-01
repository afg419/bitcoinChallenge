import {Currency} from "./Currency";
export interface ICrpytoExchangeRate {
    readonly date: Date;
    readonly source: Currency;
    readonly target: Currency;
    readonly rate: number;
    readonly apiName: string;
}