import { Router } from "express";
import passport from "passport";
import { passportCall } from "../middleware/passport.middleware.js";
import { createToken } from "../utils/jwt.js";

const router = Router();

router.post("/register", passportCall("register"), async (req, res) => {
  try {
    return res.status(201).json({ status: "success", message: "User created" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
});

router.get("/login", passportCall("login"), async (req, res) => {
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
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
    session: false,
  }),
  async (req, res) => {
    try {
      return res.status(200).json({ status: "success", payload: req.user });
    } catch (error) {
      return res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    }
  }
);

router.get("/current", passportCall("current"), async (req, res) => {
  res.status(200).json({ status: "success", user: req.user });
});

export default router;
