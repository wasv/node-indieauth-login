import express from "express";
import axios from "axios";
import path from "path";
import crypto from "crypto";
import cheerio from "cheerio";
import dotenv from "dotenv";
import qs from "qs";

dotenv.config();

var router = express.Router();

const get_auth_url = async (url) =>
  await axios
    .get(url)
    .then((result) => {
      const page = cheerio.load(result.data);
      return new URL(
        page("link").attr("rel", "authorization_url").attr("href")
      );
    })
    .catch(() => false);

const check_user_id = async (url, data) =>
  await axios
    .post(url, qs.stringify(data), {
      headers: { "Content-type": "application/x-www-form-urlencoded" },
    })
    .then((result) => {
      return result.data.me;
    })
    .catch((e) => {
      console.log(e);
      return false;
    });

router.get("/", async (req, res) => {
  res.sendFile(path.join(path.resolve(), "dist/login.html"));
});

router.post("/", async (req, res) => {
  const host = req.protocol + "://" + req.get("host");
  const cb_url = new URL(path.join(".", req.baseUrl, "callback"), host);
  const success_url = new URL(path.join(".", req.baseUrl, "success"), host);

  const auth_url = await get_auth_url(req.body.uid);

  if (auth_url) {
    req.session.state = crypto.randomBytes(8).toString("hex");
    req.session.redirect_to = req.body.redirect_to || success_url.toString();
    req.session.auth_url = auth_url.toString();
    req.session.temp_uid = req.body.uid;

    auth_url.searchParams.append("state", req.session.state);
    auth_url.searchParams.append("redirect_uri", cb_url);
    auth_url.searchParams.append("client_id", process.env.CLIENT_ID);
    auth_url.searchParams.append("me", req.body.uid);

    res.redirect(auth_url);
  } else {
    res.status(400).send("Unable to find authorization endpoint.")
  }
});

router.get("/callback", async (req, res) => {
  const host = req.protocol + "://" + req.get("host");
  const cb_url = new URL(
    path.join(".", req.baseUrl, "callback"),
    host
  ).toString();

  const user_id = await check_user_id(req.session.auth_url, {
    code: req.query.code,
    redirect_uri: cb_url,
    client_id: process.env.CLIENT_ID,
  });

  delete req.session.state;
  delete req.session.auth_url;

  if(new URL(req.session.temp_uid).domain === new URL(user_id).domain) {
    delete req.session.temp_uid;
    req.session.uid = user_id;
    res.redirect(req.session.redirect_to);
    delete req.session.redirect_to;
  } else {
    res.status(400).send("Unable to verify User ID.")
  }
});

router.get("/success", async (req, res) => {
  res.sendFile(path.join(path.resolve(), "dist/success.html"));
});

export default router;
