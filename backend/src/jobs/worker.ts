import "dotenv/config";

import { Worker } from "bullmq";
import GenerateAssetBundleJob from "./GenerateAssetBundleJob";
import redisConfig from "../config/redis";

const worker = new Worker(GenerateAssetBundleJob?.key, async job => {
  await GenerateAssetBundleJob.handle();
  console.log("Job finished");
}, { connection: redisConfig });

worker.on('completed', job => {
  console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});