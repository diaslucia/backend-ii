import dotenv from "dotenv";

dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  SECRET_CODE: process.env.NODE_SECRET_PASS,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  JWT_SECRET_CODE: process.env.JWT_SECRET_CODE,
  GMAIL_EMAIL: process.env.GMAIL_EMAIL,
  GMAIL_PASS: process.env.GMAIL_PASS,
};
