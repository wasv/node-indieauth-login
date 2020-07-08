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
  if (req.session.uid) {
    res.set('User', req.session.uid);
    if (req.query.uid) {
      if (req.session.uid == req.query.uid) {
        res.sendStatus(200);
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(200);
    }
  } else {
    res.sendStatus(401);
  }
});

export default router;
