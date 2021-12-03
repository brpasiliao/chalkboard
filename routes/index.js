const express = require("express");

const signUpRoute = require("./sign-up");

const router = express.Router();

module.exports = (params) => {
  router.get("/", (request, response, next) => {
    try {
      return response.render("layout", {
        pageTitle: "Chalkboard",
        template: "index",
      });
    } catch (err) {
      return next(err);
    }
  });

  router.use("/sign-up", signUpRoute(params));

  return router;
};
