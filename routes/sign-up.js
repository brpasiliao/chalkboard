const { request } = require("express");
const express = require("express");
const client = require("../db");
const { check, validationResult } = require("express-validator");
const router = express.Router();

module.exports = (params) => {
  router.get("/", (request, response, next) => {
    try {
      return response.render("layout", {
        pageTitle: "Sign Up",
        template: "sign-up",
        // errors
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post(
    "/",
    [
      check("firstName")
        .trim()
        .isLength({ min: 2 })
        .escape()
        .withMessage("Your first name is required."),
      check("lastName")
        .trim()
        .isLength({ min: 2 })
        .escape()
        .withMessage("Your last name is required."),
      check("email")
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage("A valid email address is required."),
      check("password1")
        .trim()
        .escape()
        .withMessage("Please input a password."),
      check("message")
        .trim()
        .escape()
        .withMessage("Please confirm your password."),
    ],
    (request, response, next) => {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        console.log(errors);
        return response.redirect("/sign-up");
      } else {
        client.connect((err) => {
          const users = client.db("cbdb").collection("users");

          let user = {
            role: request.body.role,
            email: request.body.email,
            password: request.body.password1,
            firstName: request.body.firstName,
            lastName: request.body.lastName,
          };

          users.findOne({ email: request.body.email }, (error, u) => {
            if (u !== null) {
              console.log("An account with this email already exists!");
              return response.redirect("/sign-up");
            } else {
              users.insertOne(user, function (err, res) {
                if (err) throw err;
                console.log("User saved!");
              });
              return response.redirect("/");
            }
          });
        });
      }
    }
  );

  return router;
};
