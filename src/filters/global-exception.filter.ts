/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { I18nService } from "nestjs-i18n";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const status = statusCode === HttpStatus.INTERNAL_SERVER_ERROR ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK;

    const lang = request.headers["accept-language"] || "en";

    let message = "Internal server error";

    if (exception instanceof Error) {
      const err = exception as Error & {
        response?: {
          message?: string;
          error?: string;
        };
      };

      message = err.response?.message || err.message || message;

      if (typeof message === "string") {
        try {
          const translatedMessage = await this.i18n.translate(message, {
            lang: lang as string,
          });

          if (typeof translatedMessage === "string") {
            message = translatedMessage;
          }
        } catch {
          // Keep original message if translation fails
        }
      }

      response.status(status).json({
        statusCode,
        message: `${err.response?.error || err.name || "Internal Server Error"}: ${message}`,
        data: null,
      });
    } else {
      response.status(status).json({
        statusCode,
        message: `Internal Server Error: ${message}`,
        data: null,
      });
    }
  }
}
