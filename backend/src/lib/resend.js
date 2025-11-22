import { Resend } from "resend";
import { env } from "./env.js";
// const key = process.env.RESEND_API_KEY;
// if (!key) return Error("Email sending key is not exist");

const API_KEY = env.RESEND_API_KEY;
const EmailFrom = env.RESEND_FROM;
const EmailName = env.RESEND_FROM_NAME;

if (!API_KEY || !EmailFrom || !EmailName) {
  throw new Error("Email sending key is not exist");
}
export const resendClient = new Resend(API_KEY);

export const sender = {
  email: EmailFrom,
  name: EmailName,
};
