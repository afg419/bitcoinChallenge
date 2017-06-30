export class Job {
    jobName: string;
    runEvery: string;
    jobExecution: () => void;

    constructor(jobName: string, runEvery: string, jobExecution: () => void){
        this.jobName = jobName;
        this.runEvery = runEvery;
        this.jobExecution = jobExecution;
    }
}