const fs = require("fs");
const path = require("path");
const express = require("express");
const uuid = require("uuid");
const app = express();
const PORT = process.env.PORT || 2592;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", function (err, data) {
        res.json(JSON.parse(data));
    });
});

app.post("/api/notes", function (req, res) {
    // read the db file
    fs.readFile("db/db.json", "utf8", function (err, data) {
        res.json(JSON.parse(data));
    });
    // create a new note
    const newNotes = { id: uuid(), ...req.body };
    // push the newnote in db
    console.log(newNotes);
    res.push(JSON.parse(newNotes));
    // write a new file with 
    fs.writeFile("db/db.json", newNotes, function (err, data) {
        res.json(JSON.parse(data));
    });
});

app.delete("/api/notes/:id", function (req, res) {

});

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// listen to the port and allows it to run
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
