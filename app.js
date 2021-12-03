const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();
const routes = require("./routes");

app.set("trust proxy", 1);
app.locals.siteName = "Chalkboard";

const cookieSession = require("cookie-session");
app.use(
  cookieSession({
    name: "session",
    keys: ["dfgsdgzsdewdGSGe", "sdgesSGSE"],
  })
);

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static(path.join(__dirname, "./site")));

app.use("/", routes());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
