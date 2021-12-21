const express = require("express");
const path = require("path");
// const cookieSession = require("cookie-session");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const app = express();
const routes = require("./routes");

app.set("trust proxy", 1);
app.locals.siteName = "Chalkboard";

app.use(
  session({
    store: new FileStore({
      minTimeout: 2000,
      maxTimeout: 4000,
    }),
    secret: "sdlnfliwendksc",
    resave: true,
    saveUninitialized: true,
  })
);

// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["dfgsdgzsdewdGSGe", "sdgesSGSE"],
//   })
// );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static(path.join(__dirname, "./site")));

app.use("/", routes());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
