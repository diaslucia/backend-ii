import { Router } from "express";
import passport from "passport";
import { passportCall } from "../middleware/passport.middleware.js";
import { createToken } from "../utils/jwt.js";
// Controllers
import sessionControllers from "../controllers/session.controllers.js";

const router = Router();

router.post("/register", passportCall("register"), sessionControllers.register);

router.get("/login", passportCall("login"), sessionControllers.login);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
    session: false,
  }),
  sessionControllers.loginGoogle
);

router.get("/current", passportCall("current"), sessionControllers.getCurrent);

export default router;
