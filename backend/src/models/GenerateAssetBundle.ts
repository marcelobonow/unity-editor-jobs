import { Request, Response } from "express";

import Queue from "../services/Queue";
import { config } from "../jobs/GenerateAssetBundleJob";

export async function AddJobGenerateAssetBundle(req: Request, res: Response) {
  await Queue.add(config.key, {});
  res.json({ message: "Added to queue" });
}