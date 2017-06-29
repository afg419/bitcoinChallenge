import * as Agenda from 'agenda'
import {Job} from "./Job";

export class JobRunner{
    jobs: Job[];
    runner: Agenda;

    constructor(jobs: Job[], runner: Agenda){
        this.jobs = jobs;
        this.runner = runner;

        for( let job of jobs){
            runner.define(job.jobName, job.jobExecution)
        }
    }

    start(){
        for( let job of this.jobs){
            let thisJob = this.runner.create(job.jobName);
            thisJob.repeatEvery(job.runEvery).save()
        }

        this.runner.start()
    }
}