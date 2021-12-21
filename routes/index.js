const express = require("express");

const signUpRoute = require("./sign-up");
const logInRoute = require("./log-in");
const homeRoute = require("./home");
const logOutRoute = require("./log-out");
const router = express.Router();

module.exports = (params) => {
  router.get("/", (request, response, next) => {
    if (!request.session.user) {
      try {
        return response.render("layout", {
          pageTitle: "Chalkboard",
          nav: "none",
          template: "index",
        });
      } catch (err) {
        return next(err);
      }
    } else {
      console.log("index to home");
      response.redirect("/home");
    }
  });

  router.use("/sign-up", signUpRoute(params));
  router.use("/log-in", logInRoute(params));
  router.use("/home", homeRoute(params));
  router.use("/log-out", logOutRoute(params));

  return router;
};
