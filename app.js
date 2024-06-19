require("dotenv").config({ path: "./server/.env" });
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(expressLayouts);

app.use(cookieParser("CookingBlogSecure"));
app.use(
  session({
    secret: "CookingBlogSecretSession",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());
app.use(fileUpload());

app.set("view engine", "ejs");
app.set("layout", "layouts/main"); // Layout dosyasını burada ayarlayın

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.error_msg = req.flash("error_msg");
  next();
});

const routes = require("./server/routes/recipeRoutes.js");
const userRoutes = require("./server/routes/userRoutes.js");

app.use("/", routes);
app.use("/users", userRoutes);

app.listen(port, () => console.log(`Listening to port ${port}`));
