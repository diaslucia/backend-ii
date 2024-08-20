import envs from "./env.config.js";
import passport from "passport";
import local from "passport-local";
import userRepository from "../managers/user.repository.js";
import google from "passport-google-oauth20";
import jwt from "passport-jwt";
import passportCustom from "passport-custom";
import cartRepository from "../managers/cart.repository.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import { cookieExtractor } from "../utils/cookieExtractor.js";
import { verifyToken } from "../utils/jwt.js";

const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const CustomStrategy = passportCustom.Strategy;

export const initializePassport = () => {
  // Register Strategy
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, age, role } = req.body;
          const user = await userRepository.getByEmail(username);

          if (user)
            return done(null, false, { message: "User already exists" });

          const cart = await cartRepository.create();

          const newUser = {
            first_name,
            last_name,
            password: createHash(password),
            email: username,
            age,
            cart: cart._id,
            role: role || "user",
          };

          const userCreate = await userRepository.create(newUser);

          return done(null, userCreate);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Login Strategy
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userRepository.getByEmail(username);
          if (!user || !isValidPassword(user.password, password))
            return done(null, false, { message: "Invalid user or email" });

          return done(null, user);
        } catch (error) {
          console.log(error);
          done(error);
        }
      }
    )
  );

  // Google Strategy
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: envs.GOOGLE_CLIENT_ID,
        clientSecret: envs.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/session/google",
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const { name, emails } = profile;
          const user = await userRepository.getByEmail(emails[0].value);

          if (user) {
            return cb(null, user);
          } else {
            const newUser = {
              first_name: name.givenName,
              last_name: name.familyName,
              email: emails[0].value,
            };

            const userCreate = await userRepository.create(newUser);
            return cb(null, userCreate);
          }
        } catch (error) {
          return cb(error);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: envs.JWT_SECRET_CODE,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "current",
    new CustomStrategy(async (req, done) => {
      try {
        const token = cookieExtractor(req);
        if (!token) return done(null, false, { message: "Missing token" });
        const tokenVerify = verifyToken(token);
        if (!tokenVerify)
          return done(null, false, { message: "Invalid token" });
        const user = await userRepository.getByEmail(tokenVerify.email);
        done(null, user, { message: "Valid token" });
      } catch (error) {
        done(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userRepository.getById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
