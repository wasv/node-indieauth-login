import crypto from "crypto";
import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import memorystore from "memorystore";
var MemoryStore = memorystore(session);

import loginRouter from "./routes/login.js";
import userRouter from "./routes/users.js";

dotenv.config();

var app = express();

app.use(logger("dev"));

app.set("trust proxy", "loopback");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    store: new MemoryStore({ checkPeriod: 43200000 }),
    secret: process.env.SECRET_KEY || crypto.randomBytes(16).toString("hex"),
    resave: true,
    name: "iauth",
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 21600000,
      domain: process.env.COOKIE_DOMAIN,
    },
  })
);
app.use("/static", express.static(path.join(path.resolve(), "dist")));

app.use("/login", loginRouter);
app.use("/user", userRouter);

export default app;
