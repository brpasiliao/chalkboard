const { request } = require("express");
const express = require("express");
const router = express.Router();

module.exports = (params) => {
  router.get("/", (request, response, next) => {
    request.session.user = null;
    console.log("logout to index");
    response.redirect("/");
  });

  return router;
};
