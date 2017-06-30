import { expect } from 'chai';
import { CoinCapTickerClient } from "../main/cryptoTickers/CoinCapTickerClient";

describe('Hello function', () => {
    it('should return hello world', () => {
        let cctc = new CoinCapTickerClient("url");
        expect(cctc.sayHelloWorld()).to.equal("hello world")
    });
});
