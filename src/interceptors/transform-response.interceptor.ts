/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { I18nContext, I18nService } from "nestjs-i18n";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable()
export class TransformHttpCodeInterceptor implements NestInterceptor {
  constructor(private readonly i18n: I18nService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();

    response.status(200);

    return next.handle().pipe(
      map((data) => {
        return {
          statusCode: 200,
          message: "Success",
          data: data ?? null,
        };
      }),
      catchError((err) => {
        const supportedStatusCodes = [201, 413, 429, 500];

        if (supportedStatusCodes.includes(err.status)) {
          response.status(err.status);
        }

        let message = "Internal server error";
        message = err.response?.message || err.message || message;

        if (typeof message === "string") {
          try {
            const lang = I18nContext.current()?.lang || "en";
            const translatedMessage = this.i18n.translate(message, {
              lang,
            });

            if (typeof translatedMessage === "string") {
              message = translatedMessage;
            }
          } catch {
            // Keep original message if translation fails
          }
        }

        return new Observable((observer) => {
          observer.next({
            statusCode: err.status || 500,
            message,
            data: null,
          });
          observer.complete();
        });
      }),
    );
  }
}
