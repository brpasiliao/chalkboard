const { request } = require("express");
const express = require("express");
const client = require("../db");
const router = express.Router();

module.exports = (params) => {
  router.get("/", (request, response, next) => {
    try {
      return response.render("layout", {
        pageTitle: "Home",
        nav: "home-nav",
        template: "home",
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
