const express = require("express");

const router = express.Router();

module.exports = (params) => {
  // const { feedbackService } = params;

  router.get("/", (request, response, next) => {
    try {
      return response.render("layout", {
        pageTitle: "Sign Up",
        template: "sign-up",
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post("/", (request, response) => {
    console.log(request.body);
    return response.send("Signed up");
  });

  return router;
};
