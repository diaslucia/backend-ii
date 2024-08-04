import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import viewsRoutes from "./routes/views.routes.js";
import routes from "./routes/index.routes.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import { connectMongoDB } from "./config/mongoDB.config.js";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import envs from "./config/env.config.js";

const PORT = 8080;
const app = express();

// Mongo
connectMongoDB();
// Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Cookies
app.use(cookieParser());
// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static("public"));
// Routes
app.use("/api", routes);
app.use("/", viewsRoutes);
// Sessions
app.use(
  session({
    secret: envs.SECRET_CODE,
    resave: true,
    saveUninitialized: true,
  })
);
// Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
