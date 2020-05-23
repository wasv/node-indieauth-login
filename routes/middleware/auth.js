export const checkAuth = (req, res, next) => {
  if(req.session.user_id) {
    next();
  } else {
    res.redirect("/login?redirect_to="+req.baseUrl);
  }
};

