import { LogError, LogInfo } from "./utils/logger";
import { routes } from "./routes";
import express from "express";
import cors from "cors";
import "dotenv/config";
import BullBoard from "./services/BullBoard";

const context = "Iniciando servidor";
LogInfo("Importou rotas", context);

const isTest = process.env.NODE_ENV == "test";
const port = (isTest ? process.env.SERVER_PORT_TEST : process.env.SERVER_PORT) || 3000;
const app = express();

app.use(express.urlencoded({
  limit: "50mb",
  extended: true,
}));

app.disable("x-powered-by");
app.use((req, res, next) => {
  //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
  res.header("Access-Control-Allow-Origin", "*");
  //Quais são os métodos que a conexão pode realizar na API
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("X-Accel-Buffering", "no");
  app.use(cors());
  next();
});

app.use(express.json({ limit: "5mb" }));
app.use('/admin/queues', BullBoard);
app.use(routes);


app.use((err, req, res: express.Response, next) => {
  if (!err) next();
  LogError("Exceção não tratada pelos middleware: " + err, context);
  res.sendStatus(500);
});


const server = app.listen(port, () => LogInfo(`Servidor node iniciou na porta ${port}`, context));

process.on("uncaughtException", function (err) {
  LogError("Exceção não tratada no processo: " + err, context);
});

export default server;
