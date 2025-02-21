import * as bcrypt from "bcrypt";
import * as crc from "crc";
import { v4 as uuidv4 } from "uuid";

import { Banks } from "src/constants/banks";

export function generateHash(password: string): string {
  const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10");
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);

  return bcrypt.hashSync(password, salt);
}

export function generateUuid(): string {
  return uuidv4();
}

export function generateShortInt(): number {
  const uuid = uuidv4();
  const hash = crc.crc32(uuid);

  return Math.abs(hash) % 100000000;
}

export function validateHash(password: string | undefined, hash: string | undefined | null): boolean {
  if (!password || !hash) {
    console.error("Password or hash is missing.");
    return false;
  }

  return bcrypt.compareSync(password, hash);
}

export function randomFileName(fileName?: string, ext: string = "jpg"): string {
  const uuid = uuidv4();

  return `${fileName ? encodeURIComponent(fileName) : ""}_${uuid}.${ext}`;
}

export function timestampToDate(timestamp: number, utcOffset: number = 7) {
  const dateObject = new Date(timestamp * 1000);

  const utcHours = dateObject.getUTCHours();
  dateObject.setUTCHours(utcHours + utcOffset);

  return dateObject;
}

export function dateToTimestamp(dateObject: Date): number {
  const timestampInSeconds = Math.floor(dateObject.getTime() / 1000);

  return timestampInSeconds;
}

export function convertToSeconds(dateString: string) {
  return Math.floor(new Date(dateString).getTime() / 1000);
}

export function now(): number {
  const date = new Date();
  const timestampInSeconds = Math.floor(date.getTime() / 1000);

  return timestampInSeconds;
}

export function toISO8601(timestampInSeconds: number): string {
  const date = new Date(timestampInSeconds * 1000);
  return date.toISOString();
}

export function createVietQRcode(
  BANK_ID: string,
  ACCOUNT_NO: number | string,
  AMOUNT: number,
  DESCRIPTION: string,
  ACCOUNT_NAME: string,
): string {
  if (Banks.checkIfMatchExists(BANK_ID)) {
    return `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-compact.png?amount=${AMOUNT}&addInfo=${encodeURIComponent(DESCRIPTION)}&accountName=${encodeURIComponent(ACCOUNT_NAME)}`;
  } else throw new Error("Invalid QR data information");
}

export function generateOrderCode(): number {
  return generateShortInt();
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function printBanner() {
  const banner = `
███╗   ██╗███████╗███████╗████████╗  ██╗███████╗     █████╗ ██████╗ ██╗
████╗  ██║██╔════╝██╔════╝╚══██╔══╝  ██║██╔════╝    ██╔══██╗██╔══██╗██║
██╔██╗ ██║█████╗  ███████╗   ██║     ██║███████╗    ███████║██████╔╝██║
██║╚██╗██║██╔══╝  ╚════██║   ██║██   ██║╚════██║    ██╔══██║██╔═══╝ ██║
██║ ╚████║███████╗███████║   ██║╚█████╔╝███████║    ██║  ██║██║     ██║
╚═╝  ╚═══╝╚══════╝╚══════╝   ╚═╝ ╚════╝ ╚══════╝    ╚═╝  ╚═╝╚═╝     ╚═╝
\n`;
  console.log(banner);
}
