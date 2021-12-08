const { request } = require("express");
const express = require("express");
const User = require("../models/user");

// const { check, validationResult } = require("express-validator");

const router = express.Router();

module.exports = (params) => {
  router.get("/", (request, response, next) => {
    try {
      return response.render("layout", {
        pageTitle: "Log In",
        template: "log-in",
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post("/", (request, response) => {
    User.findOne({ email: request.body.email }, (error, u) => {
      if (u !== null) {
        if (u.password == request.body.password) {
          console.log("Logged in!");
          return response.redirect("/log-in");
        } else {
          console.log("Wrong password!");
          return response.redirect("/log-in");
        }
      } else {
        console.log("User doesn't exist!");
        return response.redirect("/log-in");
      }
    });
  });

  return router;
};
