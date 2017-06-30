

import { expect } from 'chai';
import { CoinCapTickerClient } from "../main/cryptoTickers/CoinCapTickerClient";
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('Hello function', () => {
    it('should return hello world', () => {
        let cctc = new CoinCapTickerClient("url");
        expect(cctc.sayHelloWorld()).to.equal("hello world")
    });
});
