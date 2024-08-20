import { request, response } from "express";
import { createToken } from "../utils/jwt.js";

const register = async (req = request, res = response) => {
  try {
    return res.status(201).json({ status: "success", message: "User created" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

const login = async (req = request, res = response) => {
  try {
    const token = createToken(req.user);
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({ status: "success", payload: req.user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

const loginGoogle = async (req = request, res = response) => {
  try {
    return res.status(200).json({ status: "success", payload: req.user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

const getCurrent = async (req = request, res = response) => {
  try {
    res.status(200).json({ status: "success", user: req.user });
  } catch {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export default {
  register,
  login,
  loginGoogle,
  getCurrent,
};
