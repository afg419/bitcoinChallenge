export class Job{
    jobName: string;
    runEvery: string;
    jobExecution: (job, done) => void

    constructor(jobName: string, runEvery: string, jobExecution: (job, done) => void){
        this.jobName = jobName;
        this.runEvery = runEvery;
        this.jobExecution = jobExecution;
    }
}