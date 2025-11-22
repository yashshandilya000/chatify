import "dotenv/config";

export const env = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM: process.env.RESEND_FROM,
  RESEND_FROM_NAME: process.env.RESEND_FROM_NAME,
  CLIENT_URL: process.env.CLIENT_URL,
};
