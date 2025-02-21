import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { PinoLogger } from "nestjs-pino";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: PinoLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.info(`Incoming Request: ${req.method} ${req.url}`);
    res.on("finish", () => {
      this.logger.info(`Response Status: ${res.statusCode}`);
    });
    next();
  }
}
