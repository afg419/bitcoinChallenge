import {DBClient} from "../db/clients/DBClient";

export class DeleteTickerWorker implements JobWorker {
    //this is a number of seconds
    private readonly deleteTickersOlderThan: number;
    private readonly dbClient: DBClient;

    constructor(deleteTickersOlderThan: number, dbClient: DBClient){
        console.log("New delete ticker client!");
        this.deleteTickersOlderThan = deleteTickersOlderThan;
        this.dbClient = dbClient;
    }


    readonly run: () => void = () => {
        this.deleteOutOfDateTickers();
    };

    private deleteOutOfDateTickers(): void {
        let now: Date = new Date();
        let then: Date = new Date(now);
        then.setSeconds(now.getSeconds() - this.deleteTickersOlderThan);

        this.dbClient.deleteExchangesOlderThan(then);
    }
}