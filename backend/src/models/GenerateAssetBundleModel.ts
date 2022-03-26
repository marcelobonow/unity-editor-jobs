export const jobName = "GenerateAssetBundle";

import { Job } from "bullmq";
import Queue from "../services/Queue";
import { LogInfo } from "../utils/logger";

type NewType = Job<any, any, string>;

type BullJob = NewType;

interface JobRunning {
  job: BullJob;
  resolver: (any?) => void;
}

const jobsRunning: JobRunning[] = [];

export async function AddJob(data: any) {
  await Queue.add(jobName, data);
}

export async function ProcessRequest(job: BullJob) {
  return new Promise((resolve, reject) => {
    const context = "Novo job";
    LogInfo("Iniciando novo job: " + job.id, context);
    jobsRunning[job.id] = { job, resolver: resolve };

    ///TODO: No start da aplicação iniciar o unity
    //Se comunica com o unity fazendo um pooling 
  });
}

export async function FinishJob(jobId: string, data: any) {
  const context = "Job finalizado";
  LogInfo("Buscando jobs ativos", context);
  const job = jobsRunning[jobId];
  if (job == null) {
    LogInfo("Terminou o job mas não estava nos jobs rodando", context);
    return;
  }

  LogInfo("Finalizando job " + jobId, context);
  job.resolver(data);
}

export async function RecoverActiveJobs() {
  const context = "Recuperando jobs";
  LogInfo("Buscando jobs que estavam ativos", context);
  const activeJobs = await Queue.getActive();

  for (const job of activeJobs) {
    const jobData = job.data;
    const jobId = job.id;
    await Queue.remove(jobId)
    await Queue.add(jobName, jobData);
    LogInfo("Reiniciando job: " + jobId, context);
  }
}

RecoverActiveJobs();