import { Router } from "express";
import multer from "multer";
import "dotenv/config";

import { AddJob, FinishJob } from "./controllers/GenerateAssetBundleController";
import multerConfig from "./config/multerConfig";

export const routes = Router();

routes.get("/", (_req, res) => res.send("OK"));
routes.post("/assetBundles", multer(multerConfig).single("file"), AddJob);
routes.post("/onFinishJob", FinishJob);
