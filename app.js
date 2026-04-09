require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");
const PORT = process.env.PORT || 3000;
const app = express();
const routes = require("./routes");
const MongoStore = require("connect-mongo");


app.set("trust proxy", 1);
app.locals.siteName = "Chalkboard";

app.use(session({
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static(path.join(__dirname, "./site")));

app.use("/", routes());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
