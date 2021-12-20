const { request } = require("express");
const express = require("express");
const client = require("../db");
const router = express.Router();

module.exports = (params) => {
  router.get("/", (request, response, next) => {
    if (!request.session.user) {
      // if (!request.headers.authorization) {
      //   console.log("no auth");

      // }
      return response.redirect("/log-in");
    } else {
      console.log("Session true");
      try {
        return response.render("layout", {
          pageTitle: "Home",
          nav: "home-nav",
          template: "home",
        });
      } catch (err) {
        return next(err);
      }
    }
  });

  router.get("/:page", (request, response, next) => {
    if (!request.session.user) {
      console.log("Session not set-up yet");

      if (!request.headers.authorization) {
        console.log("no auth");
        return response.redirect("/log-in");
      }
    } else {
      console.log("Session true");
      try {
        return response.render("layout", {
          pageTitle: request.params.page,
          nav: "home-nav",
          template: "home",
        });
      } catch (err) {
        return next(err);
      }
    }
  });

  return router;
};
