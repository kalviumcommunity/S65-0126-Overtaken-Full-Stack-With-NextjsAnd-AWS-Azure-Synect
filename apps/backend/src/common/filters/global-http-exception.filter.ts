import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { handleError } from "../utils/handle-error";
import { logger } from "../utils/logger";

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<{
      status: (statusCode: number) => { send: (body: unknown) => void };
    }>();
    const request = ctx.getRequest<{ url: string; method: string }>();

    const handled = handleError({
      exception,
      path: request.url,
      method: request.method,
    });

    logger.error(handled.message, {
      path: handled.path,
      method: handled.method,
      statusCode: handled.statusCode,
      code: handled.code,
      details: handled.details,
      stack: handled.stack,
    });

    response.status(handled.statusCode).send({
      success: false,
      message: handled.message,
      data: null,
      error: {
        code: handled.code,
        details: handled.details,
      },
      path: handled.path,
      timestamp: new Date().toISOString(),
      ...(handled.stack ? { stack: handled.stack } : {}),
    });
  }
}
