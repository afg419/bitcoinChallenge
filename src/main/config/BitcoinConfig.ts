export class BitcoinConfig {
    host: string = 'localhost';
    port: string | number = process.env.BTC_PORT || 8332;
    user: string = 'username';
    pass: string = 'password';
    timeout: number = 30000;
}

export let bitcoinConfig = new BitcoinConfig();
