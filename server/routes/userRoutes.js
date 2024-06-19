const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/logout", userController.logout);

module.exports = router;
