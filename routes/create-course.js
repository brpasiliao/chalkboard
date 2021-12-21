const { request } = require("express");
const express = require("express");
const client = require("../db");
const router = express.Router();

module.exports = (params) => {
  router.get("/", (request, response, next) => {
    if (request.session.user) {
      client.connect((err) => {
        const users = client.db("cbdb").collection("users");

        users.findOne({ email: request.session.user }, (error, u) => {
          if (u.role == "teacher") {
            try {
              return response.render("layout", {
                pageTitle: "Create Course",
                nav: "profile-nav",
                template: "create-course",
                // errors
              });
            } catch (err) {
              return next(err);
            }
          } else {
            response.send("you cant create a course");
          }
        });
      });
    } else {
      response.redirect("/home");
    }
  });

  router.post("/", (request, response, next) => {
    client.connect((err) => {
      const courses = client.db("cbdb").collection("courses");
      const users = client.db("cbdb").collection("users");

      let course = {
        course: request.body.course,
        section: request.body.section,
        day: request.body.day,
        timeFrom: request.body.from,
        timeTo: request.body.to,
        description: request.body.description,
      };

      courses.findOne(
        { course: course.course, section: course.section },
        (error, c) => {
          if (c !== null) {
            console.log(
              "A course with the same name and section already exists!"
            );
            response.redirect("/create-course");
          } else {
            courses.insertOne(course, function (err, res) {
              if (err) throw err;
              console.log("Course saved!");
            });
            users.updateOne(
              { email: request.session.user },
              { $push: { courses: course } },
              (err) => {
                if (err) console.error(err);
              }
            );
            response.redirect("/home");
          }
        }
      );
    });
  });

  return router;
};
