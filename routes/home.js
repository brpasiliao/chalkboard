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
          const courses = client.db("cbdb").collection("courses");

          if (u.role == "teacher") {
            courses.find({ instructors: u.email }).toArray((error, ic) => {
              try {
                return response.render("layout", {
                  pageTitle: "Home",
                  nav: "home-nav",
                  template: "home",
                  user: u,
                  courses: ic,
                });
              } catch (err) {
                return next(err);
              }
            });
          } else if (u.role == "student") {
            courses.find({ students: u.email }).toArray((error, sc) => {
              try {
                return response.render("layout", {
                  pageTitle: "Home",
                  nav: "home-nav",
                  template: "home",
                  user: u,
                  courses: sc,
                });
              } catch (err) {
                return next(err);
              }
            });
          }
        });
      });
    }
  });

  router.get("/:course-:section/:tab", (request, response, next) => {
    if (!request.session.user) {
      console.log("page to login");
      response.redirect("/log-in");
    } else {
      client.connect((err) => {
        const users = client.db("cbdb").collection("users");

        users.findOne({ email: request.session.user }, (error, u) => {
          const courses = client.db("cbdb").collection("courses");

          if (u.role == "teacher") {
            courses.findOne(
              {
                courseName: request.params.course,
                section: request.params.section,
              },
              (error, c) => {
                try {
                  return response.render("layout", {
                    pageTitle:
                      request.params.course + "-" + request.params.section,
                    nav: "content-nav",
                    template: "content",
                    user: u,
                    course: c,
                  });
                } catch (err) {
                  return next(err);
                }
              }
            );
          }
        });
      });
    }
  });

  return router;
};
