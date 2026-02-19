type LogLevel = "error" | "warn" | "info";

type LogMeta = {
  path?: string;
  method?: string;
  statusCode?: number;
  code?: string;
  messageId?: string;
  to?: string;
  details?: unknown;
  stack?: string;
};

function serializeLog(level: LogLevel, message: string, meta?: LogMeta) {
  return JSON.stringify({
    level,
    message,
    timestamp: new Date().toISOString(),
    ...meta,
  });
}

export const logger = {
  error(message: string, meta?: LogMeta) {
    console.error(serializeLog("error", message, meta));
  },
  warn(message: string, meta?: LogMeta) {
    console.warn(serializeLog("warn", message, meta));
  },
  info(message: string, meta?: LogMeta) {
    console.info(serializeLog("info", message, meta));
  },
};
