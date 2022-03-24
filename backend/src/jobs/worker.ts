import "dotenv/config";

import { Worker } from "bullmq";
import GenerateAssetBundleJob from "./GenerateAssetBundleJob";
import redisConfig from "../config/redis";
import { LogInfo } from "../utils/logger";

const worker = new Worker(GenerateAssetBundleJob?.key, async job => {
  const context = "Asset Bundle Job";
  LogInfo("Started", context);
  await GenerateAssetBundleJob.handle();
  LogInfo("Completed", context);
}, { connection: redisConfig });

worker.on('completed', job => {
  console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});