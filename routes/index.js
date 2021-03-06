const express = require("express");

const signUpRoute = require("./sign-up");
const logInRoute = require("./log-in");
const homeRoute = require("./home");
const logOutRoute = require("./log-out");
const createCourseRoute = require("./create-course");
const courseRoute = require("./course");
const adminRoute = require("./admin");
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
  router.use("/create-course", createCourseRoute(params));
  router.use("/admin", adminRoute(params));
  router.use("/", courseRoute(params));

  return router;
};
