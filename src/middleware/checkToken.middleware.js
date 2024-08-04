import { request, response } from "express";
import { verifyToken } from "../utils/jwt.js";

export const checkToken = async (req = request, res = response, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ status: "error", message: "Token not provided" });

    const tokenVerify = verifyToken(token);
    if (!tokenVerify)
      return res
        .status(401)
        .json({ status: "error", message: "Invalid Token" });

    req.user = verifyToken;

    next();
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
