
export const checkAuth = (req, res, next) => {
  if(req.session.user_id) {
    next();
  } else {
    const host = req.protocol+'://'+req.get('host');
    res.redirect("/login?redirect_to="+req.baseUrl);
  }
};

