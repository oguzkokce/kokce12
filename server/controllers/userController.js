const User = require("../models/user"); // Kullanıcı modelinizi doğru şekilde içe aktarın

exports.login = (req, res) => {
  const { email, password } = req.body;
  // Kullanıcıyı veritabanında bulun ve doğrula
  User.findOne({ email, password }, (err, user) => {
    if (err || !user) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/users/login");
    }
    req.session.user = user;
    res.redirect("/");
  });
};

exports.register = (req, res) => {
  const { username, email, password } = req.body;
  // Yeni kullanıcı oluştur
  const newUser = new User({ username, email, password });
  newUser.save((err) => {
    if (err) {
      req.flash("error", "Failed to register");
      return res.redirect("/users/register");
    }
    req.session.user = newUser;
    res.redirect("/");
  });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
