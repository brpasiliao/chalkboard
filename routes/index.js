const express = require("express");

const signUpRoute = require("./sign-up");
const logInRoute = require("./log-in");
const homeRoute = require("./home");

const router = express.Router();

module.exports = (params) => {
  router.get("/", (request, response, next) => {
    try {
      return response.render("layout", {
        pageTitle: "Chalkboard",
        nav: "none",
        template: "index",
      });
    } catch (err) {
      return next(err);
    }
  });

  router.use("/sign-up", signUpRoute(params));
  router.use("/log-in", logInRoute(params));
  router.use("/home", homeRoute(params));

  return router;
};
