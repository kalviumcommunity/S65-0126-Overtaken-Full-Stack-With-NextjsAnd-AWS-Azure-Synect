import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { App } from "supertest/types";
import { AppModule } from "./../src/app.module";
import { GlobalHttpExceptionFilter } from "../src/common/filters/global-http-exception.filter";
import { ApiResponseInterceptor } from "../src/common/interceptors/api-response.interceptor";
import { PrismaService } from "../src/database/prisma.service";

type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
  timestamp: string;
};

type ApiErrorResponse = {
  success: false;
  error: {
    code: string;
  };
};

describe("AppController (e2e)", () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret";

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue({
        $queryRaw: jest.fn(),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    app.setGlobalPrefix("api");
    app.useGlobalInterceptors(new ApiResponseInterceptor());
    app.useGlobalFilters(new GlobalHttpExceptionFilter());
    await app.init();
  });

  it("/api (GET)", () => {
    return request(app.getHttpServer())
      .get("/api")
      .expect(200)
      .expect((response) => {
        const body = response.body as ApiSuccessResponse<string>;
        expect(body.success).toBe(true);
        expect(body.message).toBe("Request successful");
        expect(body.data).toBe("Hello World!");
        expect(body.timestamp).toBeTruthy();
      });
  });

  it("/api/admin (GET) should reject without token", () => {
    return request(app.getHttpServer())
      .get("/api/admin")
      .expect(401)
      .expect((response) => {
        const body = response.body as ApiErrorResponse;
        expect(body.success).toBe(false);
        expect(body.error.code).toBe("UNAUTHORIZED");
      });
  });
});
