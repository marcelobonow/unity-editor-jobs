export const jobName = "GenerateAssetBundle";

import { Job } from "bullmq";
import Queue from "../services/Queue";
import { LogInfo } from "../utils/logger";
import { ErrorData } from "./ErrorData";


type BullJob = Job<any, any, string>;

interface JobRunning {
  job: BullJob;
  resolver: (arg0?: any) => void;
}

const jobsRunning: Map<string, JobRunning> = new Map();

export async function AddJob(data: any) {
  await Queue.add(jobName, data);
}

export async function ProcessRequest(job: BullJob) {
  return new Promise((resolve) => {
    const context = "Novo job";
    const jobId: string = job?.id || "0";
    LogInfo("Iniciando novo job: " + jobId, context);
    jobsRunning.set(jobId, { job, resolver: resolve });

    ///TODO: No start da aplicação iniciar o unity
    //Se comunica com o unity fazendo um pooling 
  });
}

export async function FinishJob(jobId: string, data: any): Promise<ErrorData | undefined> {
  const context = "Job finalizado";
  LogInfo("Buscando jobs ativos", context);
  const job = jobsRunning.get(jobId);
  if (job == null) {
    const error = new ErrorData("Job not found", "Job ")
    LogInfo("Terminou o job mas não estava nos jobs rodando", context);
    return error;
  }

  LogInfo("Finalizando job " + jobId, context);
  job.resolver(data);
  return;
}

export async function RecoverActiveJobs() {
  const context = "Recuperando jobs";
  LogInfo("Buscando jobs que estavam ativos", context);
  const activeJobs = await Queue.getActive();

  for (const job of activeJobs) {
    const jobData = job.data;
    const jobId = job.id || "0";
    await Queue.remove(jobId)
    await Queue.add(jobName, jobData);
    LogInfo("Reiniciando job: " + jobId, context);
  }
}

RecoverActiveJobs();