"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeleteTickerWorker {
    constructor(deleteTickersOlderThan, dbClient) {
        this.run = () => {
            this.deleteOutOfDateTickers();
        };
        console.log("New delete ticker client!");
        this.deleteTickersOlderThan = deleteTickersOlderThan;
        this.dbClient = dbClient;
    }
    deleteOutOfDateTickers() {
        let now = new Date();
        let then = new Date(now);
        then.setSeconds(now.getSeconds() - this.deleteTickersOlderThan);
        this.dbClient.deleteExchangesOlderThan(then);
    }
}
exports.DeleteTickerWorker = DeleteTickerWorker;
//# sourceMappingURL=DeleteTickerWorker.js.map