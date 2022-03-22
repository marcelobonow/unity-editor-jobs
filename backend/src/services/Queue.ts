import { Queue } from "bullmq";
import redisConfig from "../config/redis";

import GenerateAssetBundleJob from "../jobs/GenerateAssetBundleJob";

export default new Queue(GenerateAssetBundleJob.key, { connection: redisConfig }); 