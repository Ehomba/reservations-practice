var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var reservations = [
    {
        customerName: "Miles",
        customerEmail: "Milesben@none.com",
        phoneNumber: "999999999",
        table: "1"
    },
];
var waitlist = [
    {
        customerName: "Narwhal",
        customerEmail: "Nard@none.com",
        phoneNumber: "555555555",
        table: "5"
    }
];


//ROUTES for HTMLs

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reservations", function (req, res) {
    res.sendFile(path.join(__dirname, "reservations.html"));
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

//Create reservations

app.post("/api/reservations", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newreservation = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newreservation.customerName = newreservation.customerName.replace(/\s+/g, "").toLowerCase();

    console.log(newreservation);

    if (reservations.length < 3) {
        reservations.push(newreservation);
        res.json(true)
    } else {
        waitlist.push(newreservation);
        res.json(false);
    }
});

// Display all reservations and waitlist

app.get("/api/reservations", function (req, res) {
    return res.json(reservations);
});

app.get("/api/waitlist", function (req, res) {
    return res.json(waitlist);
});