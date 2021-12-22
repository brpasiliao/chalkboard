const { request } = require("express");
const express = require("express");
const client = require("../db");
const router = express.Router();

module.exports = (params) => {
  router.get("/", (request, response, next) => {
    if (!request.session.user) {
      console.log("admin to login");
      response.redirect("/log-in");
    } else {
      if (!request.params.data) request.params.data = "admin-courses";
      client.connect((err) => {
        const users = client.db("cbdb").collection("users");

        users.findOne({ email: request.session.user }, (error, u) => {
          if (u.role == "admin") {
            const courses = client.db("cbdb").collection("courses");

            courses.find({}).toArray((error, cs) => {
              users.find({}).toArray((error, us) => {
                try {
                  return response.render("layout", {
                    pageTitle: "Admin View",
                    nav: "admin-nav",
                    template: "admin",
                    courses: cs,
                    users: us,
                  });
                } catch (err) {
                  return next(err);
                }
              });
            });
          }
        });
      });
    }
  });

  return router;
};
