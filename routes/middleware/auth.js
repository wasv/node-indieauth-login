import qs from "qs";

export const checkAuth = (req, res, next) => {
  if (req.session.uid) {
    next();
  } else {
    res.redirect("/login?" + qs.stringify({ rd: req.originalUrl }));
  }
};
