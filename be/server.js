const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const fileUpload = require('express-fileupload');
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const client = redis.createClient({ port: process.env.REDIS_PORT });

const authRoute = require("./routes/authRoutes");
const productRoute = require("./routes/productRoutes");
const orderRoute = require("./routes/orderRoutes");
const orderSellerRoute = require("./routes/orderSellerRoutes");
const couponRoutes = require("./routes/couponRoutes");
const couponSellerRoutes = require("./routes/couponSellerRoutes");
const profileRoutes = require("./routes/profileRoutes");
const userRoutes = require("./routes/userRoute");
const commentRoute = require("./routes/commentRoute");

require("./config/passport");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  session({
    store: new RedisStore({ client }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(fileUpload({
  createParentPath: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.use('/uploads', express.static('uploads'));

app.use("/api/user", authRoute);
app.use("/api/product", productRoute);
app.use("/api/profile", profileRoutes)
app.use("/api/users", userRoutes);
app.use(orderRoute);
app.use(orderSellerRoute);
app.use(couponRoutes);
app.use(couponSellerRoutes);
app.use(commentRoute);

app.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }
});

app.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

// 設置 Google OAuth 認證路由
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"], prompt: "select_account", })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/login/failed",
  }),
  (req, res) => {
    req.session.member = req.user;
    const tokenObject = { _id: req.user._id, email: req.user.email };
    const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET, {
      expiresIn: "1d",
    });
    res.json({
      message: "success",
      token: "JWT " + token,
      member,
    });
  }
);

app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["profile", "email"], prompt: "select_account", })
);
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/login/failed",
  }),
  (req, res) => {
    req.session.member = req.user;
    const tokenObject = { _id: req.user._id, email: req.user.email };
    const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET, {
      expiresIn: "1d",
    });
    res.json({
      message: "success",
      token: "JWT " + token,
      member,
    });
  }
);

app.use((req, res, next) => {
  console.log("這裡是 404");
  res.status(404).json({ message: "not found" });
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server running on port 8080.");
});
