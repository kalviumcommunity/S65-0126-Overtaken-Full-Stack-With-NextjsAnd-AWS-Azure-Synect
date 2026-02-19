import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

type ErrorPayload = {
  message?: string | string[];
  error?: string;
  code?: string;
};

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<{
      status: (statusCode: number) => { send: (body: unknown) => void };
    }>();
    const request = ctx.getRequest<{ url: string }>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? (exception.getResponse() as string | ErrorPayload)
        : "Internal server error";

    const fallbackMessage =
      exceptionResponse && typeof exceptionResponse === "object"
        ? exceptionResponse.message
        : exceptionResponse;

    const message = Array.isArray(fallbackMessage)
      ? fallbackMessage.join(", ")
      : (fallbackMessage ?? "Unexpected error");

    const errorCode =
      typeof exceptionResponse === "object" && exceptionResponse.code
        ? exceptionResponse.code
        : this.defaultErrorCode(status as HttpStatus);

    response.status(status).send({
      success: false,
      message,
      data: null,
      error: {
        code: errorCode,
        details: typeof exceptionResponse === "object" ? (exceptionResponse.error ?? null) : null,
      },
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }

  private defaultErrorCode(status: HttpStatus) {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return "BAD_REQUEST";
      case HttpStatus.UNAUTHORIZED:
        return "UNAUTHORIZED";
      case HttpStatus.FORBIDDEN:
        return "FORBIDDEN";
      case HttpStatus.NOT_FOUND:
        return "NOT_FOUND";
      case HttpStatus.CONFLICT:
        return "CONFLICT";
      default:
        return "INTERNAL_SERVER_ERROR";
    }
  }
}
