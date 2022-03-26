import { Worker } from "bullmq";
import { ProcessRequest, jobName } from "../models/GenerateAssetBundleModel";
import redisConfig from "../config/redis";
import { LogInfo } from "../utils/logger";


export function CreateWorker() {
  const worker = new Worker(jobName, async job => {
    const context = "Asset Bundle Job";
    LogInfo("Started", context);
    await ProcessRequest(job);
    LogInfo("Terminou de adicionar: " + job.id, context);
  }, {
    concurrency: 1,
    lockDuration: 500,
    connection: redisConfig,
  });

  worker.on('completed', job => {
    console.log(`${job.id} has completed!`);
  });

  worker.on('failed', (job, err) => {
    console.log(`${job.id} has failed with ${err.message}`);
  });
  return worker;
}
