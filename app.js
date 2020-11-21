const express = require("express");
const fs = require("fs");
const hbs = require("hbs");
const path = require("path");
const cl = console.log;
const port = process.env.PORT || 3000;

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const templatesDirectory = path.join(__dirname, "/templates");
cl(templatesDirectory);

app.use(express.static(templatesDirectory));

app.set("view engine", "hbs");
app.set("views", templatesDirectory);
hbs.registerPartials(templatesDirectory);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/api/characters/", (req, res) => {
  const data = fs.readFileSync("data.json", "utf-8");
  const JSONdata = JSON.parse(data);
  res.send(JSONdata);
});

app.get("/api/characters/:name", (req, res) => {
  const data = fs.readFileSync("data.json", "utf-8");
  const JSONdata = JSON.parse(data);

  const characterName = req.params.name.toLocaleLowerCase();
  const characterFind = JSONdata.find((el) => el.firstName === characterName);
  if (characterFind) {
    characterFind.status = 200;
    characterFind.yourip = req.ip;
    characterFind.specialThanks =
      "Special Thanks to https://naruto.fandom.com/wiki/ for Useful Information";
    res.send(characterFind);
  } else {
    res.status(200).send({
      yourip: req.ip,
      status: 404,
      specialThanks:
        "Special Thanks to https://naruto.fandom.com/wiki/ for Useful Information",
      error:
        "There was no character YOu searched For! and also make sure spelling is correct!",
    });
  }
});

app.listen(port, () => {
  cl("Sarvesh Server is started");
});
