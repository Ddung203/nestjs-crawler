export const SIGNATURE_SCHEMA = {
  PAYOS: ["amount", "cancelUrl", "description", "orderCode", "returnUrl", "secretKey"],
};

export enum AccountType {
  ADMIN = "ADMIN",
  DRIVER = "DRIVER",
  USER = "USER",
}

export enum GenderType {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
}

export enum Platform {
  ANDROID = "android",
  IOS = "ios",
  WEB = "web",
  WINDOWS = "windows",
  MACOS = "macos",
}

export enum TokenType {
  ACCESS_TOKEN = "ACCESS_TOKEN",
  REFRESH_TOKEN = "REFRESH_TOKEN",
}

export enum NotificationType {
  FCM = "FCM",
  EMAIL = "EMAIL",
}

export enum NotificationPriority {
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low",
}

export enum NotificationStatus {
  PENDING = "Pending",
  PROCESSING = "Processing",
  SENT = "Sent",
  FAILED = "Failed",
}
