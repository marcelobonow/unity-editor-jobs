import { Job } from "bullmq";
import { LogInfo } from "../utils/logger";

type BullJob = Job<any, any, string>;

export let currentJob: BullJob = null;
let promise;

export const config = {
  key: "GenerateAssetBundle",
  async handle(job: BullJob) {
    return new Promise((resolve, reject) => {
      promise = resolve;
      const context = "Novo job";
      currentJob = job;
      LogInfo("Guardado job para quando unity terminar", context);

      ///TODO: No start da aplicação iniciar o unity
      //Se comunica com o unity fazendo um pooling 
    });
  }

};

export function Resolve() {
  LogInfo("Resolve", "Resolve");
  if (promise != null)
    promise();
}