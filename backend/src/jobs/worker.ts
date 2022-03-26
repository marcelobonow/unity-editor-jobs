import "dotenv/config";

import { Worker } from "bullmq";
import { config } from "./GenerateAssetBundleJob";
import redisConfig from "../config/redis";
import { LogInfo } from "../utils/logger";


export function Setup() {
  const worker = new Worker(config?.key, async job => {
    const context = "Asset Bundle Job";
    LogInfo("Started", context);
    const result = await config.handle(job);
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
}
