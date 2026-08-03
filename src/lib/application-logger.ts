type LogLevel = "info" | "warn" | "error" | "audit";

const PREFIX = "[JoinOrg]";

function log(level: LogLevel, message: string, meta?: Record<string, unknown>) {
  const timestamp = new Date().toISOString();
  const metaStr = meta ? ` ${JSON.stringify(meta)}` : "";
  const line = `${timestamp} ${PREFIX} [${level.toUpperCase()}] ${message}${metaStr}`;
  switch (level) {
    case "error":
      console.error(line);
      break;
    case "warn":
      console.warn(line);
      break;
    default:
      console.log(line);
  }
}

export const logger = {
  info: (message: string, meta?: Record<string, unknown>) =>
    log("info", message, meta),
  warn: (message: string, meta?: Record<string, unknown>) =>
    log("warn", message, meta),
  error: (message: string, meta?: Record<string, unknown>) =>
    log("error", message, meta),
  audit: (message: string, meta?: Record<string, unknown>) =>
    log("audit", message, meta),
};
