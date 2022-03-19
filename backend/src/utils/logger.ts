import * as winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

require('console-stamp')(console, '[HH:MM:ss.l]');

const logFolder = process.env.LOG_FOLDER || "logs/";
const transport = new (DailyRotateFile)({
  filename: `${logFolder}/%DATE%/combined.log`,
});
const transportError = new (DailyRotateFile)({
  filename: `${logFolder}/%DATE%/error.log`,
  level: "error",
});
const transportException = new (DailyRotateFile)({
  filename: `${logFolder}/%DATE%/exception.log`,
  level: "alert",
});

const logger = winston.createLogger({
  level: "info",
  exitOnError: false,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf(info => `${info.timestamp}: ${info.message}`),
  ),
  transports: [
    transport,
    transportError,
  ],
  exceptionHandlers: [
    transport,
    transportException,
  ],
});

logger.add(new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf(info => `${info.timestamp}: ${info.message}`),
  ),
}));


export function LogInfo(log: string, method: string) {
  logger.info(`[${method}] ${log}`);
}
export function LogWarning(log: string, method: string) {
  logger.warn(`[${method}] ${log}`);
}
export function LogError(log: string, method: string) {
  logger.error(`[${method}] ${log}`);
}

export default logger;
