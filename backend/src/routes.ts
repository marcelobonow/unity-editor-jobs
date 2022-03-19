import { Router, Request, Response } from "express";
import { LogInfo } from "./utils/logger";
import { exec } from "child_process";
import "dotenv/config";

export const routes = Router();
const defaultFileLimit = {
  limits: {
    fileSize: 50 * 1024 * 1024, //50MB
  },
  abortOnLimit: true,
};

routes.get("/", (req, res) => res.send("OK"));
routes.post("/assetBundles", GenerateAssetBundle);

const unityEditorPath = process.env.UNITY_EDITOR_PATH;
const unityProjectPath = process.env.UNITY_PROJECT_PATH;

async function GenerateAssetBundle(req: Request, res: Response) {
  const context = "Generating asset bundle";
  LogInfo("Opening unity", context);
  exec(`"${unityEditorPath}" -projectPath "${unityProjectPath}" -executeMethod GenerateAssetBundle.ExecuteMethod`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      res.status(500).send(error);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      res.status(500).send(stderr);
      return;
    }
    res.send(stdout);
    console.log(`stdout: ${stdout}`);
  });
}