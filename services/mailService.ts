import { ServiceResponse } from "../types/serviceResponse";
import { sendMail } from "../utils";

const sendMailMessage = async (
  email: string,
  subject: string,
  htmlContent: string
): Promise<ServiceResponse> => {
  if (!email || !subject || !htmlContent) {
    return {
      message: "Email, Subject, and Html Content are required!",
      statusCode: 400,
      httpStatus: 400,
    };
  }

  await sendMail(email, subject, htmlContent);

  return { message: "Mail sent successfully!", statusCode: 200 };
};

export default {
  sendMailMessage,
};
