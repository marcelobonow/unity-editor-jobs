import { Queue } from "bullmq";
import redisConfig from "../config/redis";

import { jobName } from "../models/GenerateAssetBundleModel";

export default new Queue(jobName, { connection: redisConfig });