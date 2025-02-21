// import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
// import { Request, Response } from "express";
// import { tap } from "rxjs/operators";
// import * as winston from "winston";
// import { v4 as uuidv4 } from "uuid";
// import { Observable } from "rxjs";

// import { objToString } from "../common/utils";
// import { DiscordTransport } from "./transports/discord.transports";

// @Injectable()
// export class LoggingInterceptor implements NestInterceptor {
//   private logger: winston.Logger;

//   constructor(@Inject("DISCORD_TRANSPORT") private readonly discordTransport: DiscordTransport) {
//     this.logger = winston.createLogger({
//       levels: winston.config.npm.levels,
//       silent: false,
//       format: winston.format.combine(
//         winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
//         winston.format.json(),
//       ),
//       level: "info",
//       transports: [new winston.transports.File({ filename: "app.log" }), this.discordTransport],
//       exitOnError: true,
//       handleExceptions: true,
//       handleRejections: true,
//       exceptionHandlers: [new winston.transports.File({ filename: "../logs/exceptions.log" })],
//       rejectionHandlers: [new winston.transports.File({ filename: "../logs/rejections.log" })],
//     });
//   }

//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const ctx = context.switchToHttp();
//     const request = ctx.getRequest<Request & Record<string, any>>();
//     const response = ctx.getResponse<Response>();

//     const { method, originalUrl, query, body, headers } = request;

//     const trackId = uuidv4();
//     request["trackId"] = trackId;

//     const startTime = Date.now();

//     return next.handle().pipe(
//       tap(
//         (_data) => {
//           const { statusCode } = response;
//           const responseTime = Date.now() - startTime;

//           try {
//             const logMessage = {
//               short: `**${method} ${originalUrl} ${statusCode} ${responseTime}ms --**`,
//               query,
//               body,
//               responseBody: _data,
//               headers,
//             };

//             const logString = objToString(logMessage);
//             const color = getRandomColor();
//             const chunks = splitLogIntoChunks(logString, 1800);

//             chunks.forEach((chunk) => this.logger.info({ message: chunk, trackId, color }));
//           } catch (logError) {
//             console.log("Logging failed:", logError.message);
//           }
//         },
//         (_error) => {
//           console.log(`Request failed: ${_error.message}`);
//         },
//       ),
//     );
//   }
// }

// function splitLogIntoChunks(text: string, maxLength: number): string[] {
//   const result = [];
//   for (let i = 0; i < text.length; i += maxLength) {
//     result.push(text.substring(i, i + maxLength));
//   }
//   return result;
// }

// const getRandomColor = (): number => {
//   const colors = [3066993, 15158332, 3447003, 10181046, 15844367, 15105570, 1752220, 9807270];
//   const randomIndex = Math.floor(Math.random() * colors.length);
//   return colors[randomIndex] || 3066993;
// };
