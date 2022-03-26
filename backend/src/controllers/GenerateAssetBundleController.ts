import { Request, Response } from "express";
import { LogInfo } from "../utils/logger";

import { AddJob as AddJobModel, FinishJob as FinishJobModel } from "../models/GenerateAssetBundleModel";

export async function AddJob(req: Request, res: Response) {
  //TODO: Salvar arquivo para mandar para unity
  LogInfo("Adicionando na queue", "Add Job");
  await AddJobModel(req.body.data);
  res.json({ message: "Added to queue" });
}

export async function FinishJob(req: Request, res: Response) {
  const context = "Finalizando job";
  LogInfo("Verificando parâmetros", context);
  const { jobId, data } = req.body;

  if (!jobId) {
    res.status(400).json({ message: "JobId não informado" });
    return;
  }

  const finishJobError = await FinishJobModel(jobId, data);
  if (finishJobError != null) {
    LogInfo("Erro finalizando job: " + finishJobError.message, context)
    res.status(400).json({ message: "Job não encontrado" });
    return
  }

  res.json({ success: true, jobId });
}