/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ClassSerializerInterceptor,
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
  VersioningType,
} from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";
import * as compression from "compression";
import helmet from "helmet";
import * as morgan from "morgan";
import { I18nService } from "nestjs-i18n";

import { AppModule } from "./app.module";
import { GlobalExceptionFilter } from "./filters/global-exception.filter";
import { TransformHttpCodeInterceptor } from "./interceptors/transform-response.interceptor";
import { setupSwagger } from "./setup-swagger";
import { ApiConfigService } from "./shared/services/api-config.service";
import { SharedModule } from "./shared/shared.module";
import { printBanner } from "./common/utils";

export async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), {
    cors: true,
    abortOnError: true,
    bufferLogs: false,
  });
  const reflector = app.get(Reflector);

  const configService = app.select(SharedModule).get(ApiConfigService);
  const i18nService = app.get(I18nService);

  app.enable("trust proxy");
  app.use(helmet());
  app.use(compression());
  app.use(morgan("dev"));
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: configService.urlVersion.version,
    prefix: configService.urlVersion.prefix,
  });

  app.useGlobalFilters(new GlobalExceptionFilter(i18nService as any));
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new TransformHttpCodeInterceptor(i18nService as any),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      dismissDefaultMessages: false,
      exceptionFactory: (errors) => {
        const validationErrors = errors.map((error) => ({
          value: error.value ?? null,
          property: `Invalid ${error.property}`.toLowerCase(),
          constraints: error.constraints,
        }));

        return new UnprocessableEntityException({ message: validationErrors });
      },
    }),
  );

  if (configService.documentationEnabled) {
    setupSwagger(app);
  }

  if (!configService.isDevelopment) {
    app.enableShutdownHooks();
  }

  await app.listen(configService.appConfig.port ?? 3000, "0.0.0.0");

  printBanner();

  console.info(`Server running on: ${await app.getUrl()}`);

  return app;
}

void bootstrap();
