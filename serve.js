// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Establish some array variables
let reservations = [];
let waitingList = [];

// Basic route that sends user first to the AJAX page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});
app.get("/api/reservations", function(req, res) {
    res.json(reservations);
});
app.get("/api/waitinglist", function(req, res) {
    res.json(waitingList);
});

// Create new reservation
app.post("/api/new", function(req, res) {
    let newReservation = req.body;
    console.log(newReservation);
    if (reservations.length < 5) {
        reservations.push(newReservation);
    }
    else {
        waitingList.push(newReservation);
    }
    res.json(newReservation);
});


// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
