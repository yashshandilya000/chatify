import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailtemplate.js";

export const SendEmailWelcome = async (name, email, clientURL) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "welcome to Chatify!",
    // html: createWelcomeEmailTemplate(name, clientURL),
    html: createWelcomeEmailTemplate(name, clientURL),
  });
  if (error) {
    console.error("Error sending welcome email:", error);
    throw Error("Failed to send welcome email");
  }
  console.log("Welcome email sent successfully:", data);
};
