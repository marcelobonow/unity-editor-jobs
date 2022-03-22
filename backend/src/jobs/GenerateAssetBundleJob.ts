import { exec } from "child_process";
import { LogInfo } from "../utils/logger";

const unityEditorPath = process.env.UNITY_EDITOR_PATH;
const unityProjectPath = process.env.UNITY_PROJECT_PATH;

const config = {
  key: "GenerateAssetBundle",
  async handle() {
    const context = "Generating asset bundle";
    LogInfo("Opening unity", context);
    return new Promise((resolve, reject) => {
      exec(`"${unityEditorPath}" -projectPath "${unityProjectPath}" -executeMethod GenerateAssetBundle.CreatePrefab`, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          reject({ error });
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          reject({ error: stderr })
        }
        console.log(`stdout: ${stdout}`);
        resolve({ message: stdout });
      });
    })
  }
}

export default config;