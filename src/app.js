const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for Express confiq
const publicDirPath = path.join(__dirname, "../public/");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//Setup handlebars engine and views location
app.set("view engine", "hbs"); //USED TO get HANDLEBARS setup
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//Setup static directorty to serve
app.use(express.static(publicDirPath)); //way to customize your server;

//USE this to get the HBS for dynamic shit
app.get("", (req, res) => {
  //Code used if you want node.js to throw a value to the HBS or html
  res.render("index", {
    title: "Weather ",
    name: "Renz Bautista",
    text: "This is the home page",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Renz",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help screen",
    text: "I am helping",
    name: "Still renz",
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    errorMessage: "Help article not found",
    name: "Renz parin",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  const address = req.query.address;
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    }
    forecast(latitude, longitude, (error, foreCastData) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      res.send({
        forecast: foreCastData,
        location: location,
        address: req.query.address,
      });
    });
  });
});

//IMPORTANT NOTE: the query SHOULD only send back 1 time!! if more than 1 it sends back and error in the terminal
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search term",
    });
  }

  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    errorMessage: " Page not found",
    name: "Renz parin",
  });
});

app.listen(3000, () => {
  console.log("Server is up");
});
