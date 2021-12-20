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
        // if (!request.session.user) {
        //   console.log("Session not set-up yet");

        //   if (!request.headers.authorization) {
        //     console.log("no auth");
        //     response.setHeader("WWW-Authenticate", "Basic");
        //     response.sendStatus(401);
        //   }
        // } else {

        if (u !== null && u.password == request.body.password) {
          console.log("Logged in!");
          request.session.user = u.email;
          console.log(request.session.user);

          if (u.role == "student") {
            // return response.redirect("/pages/student-view/home.html");
            return response.redirect("/home");
          } else {
            return response.redirect("/pages/instructor-view/home.html");
          }
        } else {
          //Wrong authentication info, retry
          console.log("Wrong info!");
          return response.redirect("/log-in");
        }

        // if (u !== null && u.password == request.body.password) {
        //   console.log("Logged in!");
        //   if (u.role == "student") {
        //     // return response.redirect("/pages/student-view/home.html");
        //     return response.redirect("/home");
        //   } else {
        //     return response.redirect("/pages/instructor-view/home.html");
        //   }
        // } else {
        //   console.log("Wrong info!");
        //   return response.redirect("/log-in");
        // }
      });
    });
  });

  return router;
};
