import { Router, Response } from "express";
import upload from "express-fileupload";
import "dotenv/config";
import Queue from "./services/Queue";

import GenerateAssetBundleJob from "./jobs/GenerateAssetBundleJob";

export const routes = Router();
const defaultFileLimit = {
  limits: {
    fileSize: 50 * 1024 * 1024, //50MB
  },
  abortOnLimit: true,
};

routes.get("/", (req, res) => res.send("OK"));
routes.post("/assetBundles", upload(defaultFileLimit), AddJobGenerateAssetBundle);

export async function AddJobGenerateAssetBundle(req: Request, res: Response) {
  await Queue.add(GenerateAssetBundleJob.key, {});
  res.json({ message: "Added to queue" });
}
