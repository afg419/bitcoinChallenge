## Bitcoin Exchange Rate Aggregation Application

Purpose: Aggregates data from three external exchange rate apis. Serves them up via polling and displays data graphically.
Stack: MongoDb <--> Node/Express <--> React.
Language: TypeScript.

Summary: Our Node backend kicks off a pair of jobs which run on configurable intervals. The first polls three external apis -- Poloniex, CoinCap, BTC-e -- for exchange rate data for three coins: ETH, DASH, and LTC. It validates exchange rates and saves them into our mongoDb. The second job will delete exchange rates out of the db older than a configurable time. This prevents memory overflow in the db. The React front end kicks off it's own job which pull the most recent data from the backend. It then processes this data and renders charts and rankings for the apis.

Architecture: The app is designed to be as extensible and configurable as possible. To those ends, adding new APIs and new coins would be straightforward. It would even be clear how and where to extend the application to use different functionality for the external apis, or to interact directly with bitcoin, leaving only the implementation details up to the future programmer. In terms of configurability, the backend jobs can be toggled on and off and their intervals changed. While adding new coins would take a little bit of extra work in the apiClients, removing coins is completely configurable and can be done in a line. The front end's job is equally configurable, and can also filter coins or apis it does not want to render. This models how a 3rd party might build an app on the back end while maintaining control as the backend extends its functionality.

