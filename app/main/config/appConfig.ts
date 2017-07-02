

export class AppConfig {
    minutesBackForExchangeRateGraphs: 60

    pollServerForExchangeRatesJob: {
        shouldRun: true,
        runEvery: 60 //seconds
    }
}

export let appConfig = new AppConfig();



