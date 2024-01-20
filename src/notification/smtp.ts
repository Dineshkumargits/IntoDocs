import Mail from "nodemailer/lib/mailer";
import nodemailer from "nodemailer";
import { FROM_EMAIL, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USERNAME } from "./config";

export const getTransport = (): Mail => {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_PASSWORD,
    },
  });
};
