import {Currency} from "./Currency";
import {isNullOrUndefined} from "util";

export class TypeValidator {
    public static validDate(date: Date): boolean {
        if(isNullOrUndefined(date)){ return false; }
        return date instanceof Date;
    }

    public static validCurrency(currency: Currency): boolean {
        if(isNullOrUndefined(currency)){ return false; }
        return !isNullOrUndefined(Currency[currency]);
    }

    public static validNumber(number: number): boolean {
        if(isNullOrUndefined(number)){ return false; }
        if(isNaN(number)){ return false;}
        return typeof number == 'number';
    }

    public static validString(string: string): boolean {
        if(isNullOrUndefined(string)){ return false; }
        return typeof string == 'string';
    }
}