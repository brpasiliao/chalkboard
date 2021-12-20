const { request } = require("express");
const express = require("express");
const client = require("../db");
const router = express.Router();

module.exports = (params) => {
  router.get("/", (request, response, next) => {
    try {
      return response.render("layout", {
        pageTitle: "Log In",
        nav: "none",
        template: "log-in",
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post("/", (request, response) => {
    client.connect((err) => {
      const users = client.db("cbdb").collection("users");

      users.findOne({ email: request.body.email }, (error, u) => {
        if (u !== null && u.password == request.body.password) {
          console.log("Logged in!");
          if (u.role == "student") {
            // return response.redirect("/pages/student-view/home.html");
            return response.redirect("/home");
          } else {
            return response.redirect("/pages/instructor-view/home.html");
          }
        } else {
          console.log("Wrong info!");
          return response.redirect("/log-in");
        }
      });
    });
  });

  return router;
};
