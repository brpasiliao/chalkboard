const { request } = require("express");
const express = require("express");
const User = require("../models/user");

// const { check, validationResult } = require("express-validator");

const router = express.Router();

module.exports = (params) => {
  // const signUp = [];

  // const errors = request.session.signUp ? request.session.signUp.errors : false;
  // request.session.signUp = {};

  router.get("/", (request, response, next) => {
    try {
      return response.render("layout", {
        pageTitle: "Sign Up",
        template: "sign-up",
        // errors,
      });
    } catch (err) {
      return next(err);
    }
  });

  // router.post(
  //   "/",
  //   [
  //     check("name")
  //       .trim()
  //       .isLength({ min: 3 })
  //       .escape()
  //       .withMessage("A name is required"),
  //     check("email")
  //       .trim()
  //       .isEmail()
  //       .normalizeEmail()
  //       .withMessage("A valid email address is required"),
  //     check("title")
  //       .trim()
  //       .isLength({ min: 3 })
  //       .escape()
  //       .withMessage("A title is required"),
  //     check("message")
  //       .trim()
  //       .isLength({ min: 5 })
  //       .escape()
  //       .withMessage("A message is required"),
  //   ],
  //   (request, response) => {
  //     const errors = validationResult(request);

  //     if (!errors.isEmpty()) {
  //       request.session.signUp = {
  //         errors: errors.array(),
  //       };
  //       return response.redirect("/sign-up");
  //     }
  //     return response.send("Signed up");
  //   }
  // );

  router.post("/", (request, response) => {
    const user = new User({
      role: request.body.role,
      email: request.body.email,
      password: request.body.password1,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
    });

    User.findOne({ email: request.body.email }, (error, u) => {
      if (u !== null) {
        console.log("An account with this email already exists!");
        return response.redirect("/sign-up");
      } else {
        user.save(function (err, user) {
          if (err) {
            response.status(400).send(err);
          }
          console.log("User saved!");
          return response.redirect("/");
        });
      }
      return;
    });
  });

  return router;
};
