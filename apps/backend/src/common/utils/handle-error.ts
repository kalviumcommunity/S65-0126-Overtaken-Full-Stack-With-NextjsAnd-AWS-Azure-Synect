import { HttpException, HttpStatus } from "@nestjs/common";

type ErrorPayload = {
  message?: string | string[];
  error?: string;
  code?: string;
};

type HandleErrorInput = {
  exception: unknown;
  path: string;
  method: string;
};

export function handleError({ exception, path, method }: HandleErrorInput) {
  const isHttpException = exception instanceof HttpException;
  const statusCode = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

  const rawResponse = isHttpException
    ? (exception.getResponse() as string | ErrorPayload)
    : "Internal server error";

  const rawMessage: string | string[] =
    typeof rawResponse === "object" ? (rawResponse.message ?? "Unexpected error") : rawResponse;

  const messageFromError = Array.isArray(rawMessage) ? rawMessage.join(", ") : rawMessage;
  const codeFromError =
    typeof rawResponse === "object" && rawResponse.code
      ? rawResponse.code
      : defaultErrorCode(statusCode);
  const detailsFromError = typeof rawResponse === "object" ? (rawResponse.error ?? null) : null;

  const isProduction = process.env.NODE_ENV === "production";
  const isServerError = statusCode >= 500;

  const publicMessage =
    isProduction && isServerError
      ? "An unexpected error occurred"
      : (messageFromError ?? "Unexpected error");

  const safeDetails = isProduction && isServerError ? null : detailsFromError;

  const stack = !isProduction && exception instanceof Error ? exception.stack : undefined;

  return {
    statusCode,
    message: publicMessage,
    code: codeFromError,
    details: safeDetails,
    path,
    method,
    stack,
  };
}

function defaultErrorCode(status: number) {
  if (status === 400) return "BAD_REQUEST";
  if (status === 401) return "UNAUTHORIZED";
  if (status === 403) return "FORBIDDEN";
  if (status === 404) return "NOT_FOUND";
  if (status === 409) return "CONFLICT";
  return "INTERNAL_SERVER_ERROR";
}
