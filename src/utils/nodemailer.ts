import { env } from "@/config";
import { createTransport } from "nodemailer";
import { logger } from "./logger";
import { MESSAGE } from "@/constants";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: env.SERVER_EMAIL,
    pass: env.SERVER_EMAIL_SECRET,
  },
});

export async function sendEmail(
  email: string,
  subject: string,
  mailBody: string,
) {
  const options = {
    from: env.SERVER_EMAIL,
    to: email,
    subject,
    html: mailBody,
  };
  try {
    await transporter.sendMail(options);
    await transporter.verify();
    logger.info(MESSAGE.USER.EMAIL_SENT_SUCCESS);
  } catch (error) {
    logger.error(error, MESSAGE.USER.EMAIL_SEND_ERROR);
  }
}
