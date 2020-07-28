import express from "express";
import { checkAuth } from "./middleware/auth.js";

var router = express.Router();

router.get("/whoami", checkAuth, (req, res) => {
  res.json({ uid: req.session.uid }).end();
});

router.get("/logout", checkAuth, (req, res) => {
  delete req.session.uid;
  res.redirect("/");
});

router.get("/validate", async (req, res) => {
  if (!req.session.uid) {
    res.sendStatus(401);
    return;
  }
  res.set("User", req.session.uid);
  if (req.query.uid && req.session.uid != req.query.uid) {
    res.sendStatus(403);
    return;
  }
  res.sendStatus(200);
});

export default router;
