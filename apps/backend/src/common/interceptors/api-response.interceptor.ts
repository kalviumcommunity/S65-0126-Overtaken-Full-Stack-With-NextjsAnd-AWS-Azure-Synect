import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
  timestamp: string;
};

@Injectable()
export class ApiResponseInterceptor<T> implements NestInterceptor<T, ApiSuccessResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiSuccessResponse<T>> {
    const request = context.switchToHttp().getRequest<{ method: string }>();
    const message = this.getMessage(request.method);

    return next.handle().pipe(
      map((data) => ({
        success: true,
        message,
        data,
        timestamp: new Date().toISOString(),
      })),
    );
  }

  private getMessage(method: string) {
    switch (method) {
      case "POST":
        return "Resource created successfully";
      case "PATCH":
      case "PUT":
        return "Resource updated successfully";
      case "DELETE":
        return "Resource deleted successfully";
      default:
        return "Request successful";
    }
  }
}
