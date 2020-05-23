import fs from "fs";
import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import reactViews from "express-react-views";
import memorystore from "memorystore";
var MemoryStore = memorystore(session);

import loginRouter from "./routes/login.js";
import userRouter from "./routes/users.js";

dotenv.config();

var app = express();

app.use(logger("dev"));

app.set("views", path.resolve() + "/views");
app.set("view engine", "jsx");
app.engine("jsx", reactViews.createEngine({ beautify: true }));
app.set('trust proxy', 'loopback')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    store: new MemoryStore({ checkPeriod: 43200000 }),
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: false,
    cookie: { httpOnly: true },
  })
);
app.use(express.static(path.join(path.resolve(), "dist")));

app.get("/", async (req, res) => {
  res.sendFile(path.join(path.resolve(), "dist/login.html"));
});
app.use("/login", loginRouter);
app.use("/api/user", userRouter);

export default app;
