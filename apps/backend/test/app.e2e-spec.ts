import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { App } from "supertest/types";
import { randomUUID } from "node:crypto";
import { Role, User } from "@prisma/client";
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

type AuthUserPayload = {
  id: string;
  email: string;
  role: Role;
};

type AuthResponsePayload = {
  user: AuthUserPayload;
  accessToken: string;
  expiresIn: string;
};

type InMemoryUser = User;

function createPrismaMock() {
  const users = new Map<string, InMemoryUser>();

  const findByEmail = (email: string) => {
    for (const user of users.values()) {
      if (user.email === email) return user;
    }
    return null;
  };

  return {
    $queryRaw: jest.fn(),
    user: {
      findUnique: jest.fn(({ where }: { where: { id?: string; email?: string } }) => {
        if (where.id) {
          return Promise.resolve(users.get(where.id) ?? null);
        }
        if (where.email) {
          return Promise.resolve(findByEmail(where.email) ?? null);
        }
        return Promise.resolve(null);
      }),
      create: jest.fn(({ data }: { data: { email: string; passwordHash: string; role: Role } }) => {
        const now = new Date();
        const user: InMemoryUser = {
          id: randomUUID(),
          email: data.email,
          passwordHash: data.passwordHash,
          role: data.role,
          createdAt: now,
          updatedAt: now,
        };
        users.set(user.id, user);
        return Promise.resolve(user);
      }),
    },
  };
}

describe("AppController (e2e)", () => {
  let app: INestApplication<App>;
  let prismaMock: ReturnType<typeof createPrismaMock>;

  beforeEach(async () => {
    process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret";

    prismaMock = createPrismaMock();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
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

  it("/api/auth/signup and /api/auth/login should complete auth flow", async () => {
    const signupResponse = await request(app.getHttpServer()).post("/api/auth/signup").send({
      email: "student@synect.dev",
      password: "Password123",
      role: "STUDENT",
    });

    const signupBody = signupResponse.body as ApiSuccessResponse<AuthResponsePayload>;

    expect(signupResponse.status).toBe(201);
    expect(signupBody.success).toBe(true);
    expect(signupBody.data.user.email).toBe("student@synect.dev");
    expect(signupBody.data.accessToken).toBeTruthy();

    const loginResponse = await request(app.getHttpServer()).post("/api/auth/login").send({
      email: "student@synect.dev",
      password: "Password123",
    });

    const loginBody = loginResponse.body as ApiSuccessResponse<AuthResponsePayload>;

    expect(loginResponse.status).toBe(201);
    expect(loginBody.success).toBe(true);
    expect(loginBody.data.accessToken).toBeTruthy();
  });

  it("/api/auth/me should return current user with valid token", async () => {
    const signupResponse = await request(app.getHttpServer()).post("/api/auth/signup").send({
      email: "mentor@synect.dev",
      password: "Password123",
      role: "MENTOR",
    });

    const signupBody = signupResponse.body as ApiSuccessResponse<AuthResponsePayload>;

    const token = signupBody.data.accessToken;
    const meResponse = await request(app.getHttpServer())
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);

    const meBody = meResponse.body as ApiSuccessResponse<AuthUserPayload>;

    expect(meResponse.status).toBe(200);
    expect(meBody.success).toBe(true);
    expect(meBody.data.email).toBe("mentor@synect.dev");
    expect(
      (meBody.data as AuthUserPayload & { passwordHash?: string }).passwordHash,
    ).toBeUndefined();
  });

  it("/api/admin should reject student token (RBAC)", async () => {
    const signupResponse = await request(app.getHttpServer()).post("/api/auth/signup").send({
      email: "student2@synect.dev",
      password: "Password123",
      role: "STUDENT",
    });

    const signupBody = signupResponse.body as ApiSuccessResponse<AuthResponsePayload>;

    const token = signupBody.data.accessToken;
    const adminResponse = await request(app.getHttpServer())
      .get("/api/admin")
      .set("Authorization", `Bearer ${token}`);

    const body = adminResponse.body as ApiErrorResponse;
    expect(adminResponse.status).toBe(403);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe("FORBIDDEN");
  });
});
