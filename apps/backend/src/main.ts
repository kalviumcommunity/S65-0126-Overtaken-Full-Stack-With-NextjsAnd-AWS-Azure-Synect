import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import helmet from "@fastify/helmet";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { GlobalHttpExceptionFilter } from "./common/filters/global-http-exception.filter";
import { ApiResponseInterceptor } from "./common/interceptors/api-response.interceptor";
import { SanitizeInputPipe } from "./common/pipes/sanitize-input.pipe";
import { AppModule } from "./app.module";
import { config } from "dotenv";
config();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  await app.register(helmet as any, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    hsts: process.env.NODE_ENV === "production",
    frameguard: { action: "deny" },
  });

  const fastify = app.getHttpAdapter().getInstance();
  fastify.addHook("onRequest", (request, reply, done) => {
    const forceHttps = process.env.FORCE_HTTPS === "true";
    if (process.env.NODE_ENV !== "production" || !forceHttps) {
      done();
      return;
    }

    const forwardedProto = request.headers["x-forwarded-proto"];
    const protocol = Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto;

    if (protocol !== "https") {
      const host = request.headers.host;
      const target = `https://${host}${request.url}`;
      reply.redirect(target, 301);
      return;
    }

    done();
  });

  app.useGlobalPipes(
    new SanitizeInputPipe(),
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix("api");
  app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
  const allowedOrigins = (process.env.CORS_ORIGIN ?? "http://localhost:3000").split(",");
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  });

  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port, "0.0.0.0");
}
void bootstrap();
