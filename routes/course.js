const { request } = require("express");
const express = require("express");
const client = require("../db");
const router = express.Router();

module.exports = (params) => {
  router.get(
    "/:course-:section/:tab/:subtab?/:sub2tab?",
    (request, response, next) => {
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
                  let template = request.params.tab;
                  if (request.params.subtab) template = request.params.subtab;
                  if (request.params.sub2tab) template = request.params.sub2tab;

                  try {
                    return response.render("layout", {
                      pageTitle:
                        request.params.course + "-" + request.params.section,
                      nav: "course-nav",
                      template: template,
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
    }
  );

  router.post(
    "/:course-:section/content/materials/create-material",
    (request, response, next) => {
      if (!request.session.user) {
        console.log("page to login");
        response.redirect("/log-in");
      } else {
        client.connect((err) => {
          const users = client.db("cbdb").collection("users");

          users.findOne({ email: request.session.user }, (error, u) => {
            const courses = client.db("cbdb").collection("courses");

            if (u.role == "teacher") {
              let material = {
                materialName: request.body.fileName,
                materialCategory: request.body.fileCategory,
                materialFile: request.body.fileUpload,
              };

              courses.updateOne(
                {
                  courseName: request.params.course,
                  section: request.params.section,
                },
                { $push: { materials: material } },
                (error, c) => {
                  if (error) console.error(err);
                }
              );

              console.log("Material created!");
              response.redirect(
                "/" +
                  request.params.course +
                  "-" +
                  request.params.section +
                  "/content/materials"
              );
            }
          });
        });
      }
    }
  );

  return router;
};
