import { Request, Response } from "express";

import Queue from "../services/Queue";
import GenerateAssetBundleJob from "../jobs/GenerateAssetBundleJob";

export async function AddJobGenerateAssetBundle(req: Request, res: Response) {
  await Queue.add(GenerateAssetBundleJob.key, {});
  res.json({ message: "Added to queue" });
}