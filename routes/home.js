const { request } = require("express");
const express = require("express");
const client = require("../db");
const router = express.Router();

module.exports = (params) => {
  router.get("/", (request, response, next) => {
    if (!request.session.user) {
      console.log("home to login");
      response.redirect("/log-in");
    } else {
      client.connect((err) => {
        const users = client.db("cbdb").collection("users");

        users.findOne({ email: request.session.user }, (error, u) => {
          try {
            return response.render("layout", {
              pageTitle: "Home",
              nav: "home-nav",
              template: "home",
              user: u,
            });
          } catch (err) {
            return next(err);
          }
        });
      });
    }
  });

  // router.get("/:page", (request, response, next) => {
  //   if (!request.session.user) {
  //     console.log("Session not set-up yet");

  //     if (!request.headers.authorization) {
  //       console.log("no auth");
  //       response.redirect("/log-in");
  //     }
  //   } else {
  //     console.log("Session true");
  //     try {
  //       return response.render("layout", {
  //         pageTitle: request.params.page,
  //         nav: "home-nav",
  //         template: "home",
  //       });
  //     } catch (err) {
  //       return next(err);
  //     }
  //   }
  // });

  return router;
};
