import { Queue } from "bullmq";
import redisConfig from "../config/redis";

import { config } from "../jobs/GenerateAssetBundleJob";

export default new Queue(config.key, { connection: redisConfig }); 