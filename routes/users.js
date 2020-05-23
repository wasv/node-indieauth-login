import express from "express";
import { checkAuth } from "./middleware/auth.js";

var router = express.Router();

/* GET users listing. */
router.get("/", checkAuth, (req, res) => {
  res.send(req.session.user_id).end();
});

export default router;
