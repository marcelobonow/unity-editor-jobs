import { Router, Response } from "express";
import multer from "multer";
import "dotenv/config";
import Queue from "./services/Queue";

import { config, Resolve } from "./jobs/GenerateAssetBundleJob";
import multerConfig from "./config/multerConfig";

export const routes = Router();

routes.get("/", (req, res) => res.send("OK"));
routes.post("/assetBundles", multer(multerConfig).single("file"), AddJobGenerateAssetBundle);
routes.post("/done2", (req, res) => {
  Resolve();
  res.json({ success: true });
});

export async function AddJobGenerateAssetBundle(req: Request, res: Response) {
  await Queue.add(config.key, {});
  res.json({ message: "Added to queue" });
}


async function main() {
  const activeJobs = await Queue.getActive();
  console.log("OBLITERANDO !!!!!!!!");
  Queue.obliterate();

  for (const job of activeJobs) {
    const jobData = job.data;
    await Queue.remove(job.id)
    await Queue.add(config.key, jobData);
  }
  console.log(activeJobs);
}

main();