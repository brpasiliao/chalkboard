const { request } = require("express");
const express = require("express");
const client = require("../db");
const router = express.Router();

module.exports = (params) => {
  router.get("/", (request, response, next) => {
    if (!request.session.user) {
      try {
        return response.render("layout", {
          pageTitle: "Log In",
          nav: "none",
          template: "log-in",
        });
      } catch (err) {
        return next(err);
      }
    } else {
      console.log("login to home");
      response.redirect("/home");
    }
  });

  router.post("/", (request, response) => {
    client.connect((err) => {
      const users = client.db("cbdb").collection("users");

      users.findOne({ email: request.body.email }, (error, u) => {
        if (u !== null && u.password == request.body.password) {
          console.log("Logged in!");
          request.session.user = u.email;
          if (u.role == "admin") response.redirect("/admin/admin-courses");
          else response.redirect("/home");
        } else {
          console.log("Wrong info!");
          response.redirect("/log-in");
        }
      });
    });
  });

  return router;
};
