import { request, response } from "express";
import { sendEmail } from "../utils/sendEmail.js";

const getEmail = async (req = request, res = response) => {
  try {
    const { email, subject, message, html } = req.body;
    await sendEmail(email, subject, message, html);

    return res.status(200).json({ status: "success", message: "Email sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export default { getEmail };
