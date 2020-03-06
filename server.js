const fs = require("fs");
const path = require("path");
const express = require("express");
const uuid = require("uuid").v4;
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

app.post("/api/notes", function (request, result) {
    // read the db file
    fs.readFile("db/db.json", "utf8", function (err, data) {
        const db = JSON.parse(data);
        // create a new note
        var newNotes = { id: uuid(), ...request.body };
        // push into the array
        db.push(newNotes);
        // write a new file with newNotes 
        fs.writeFile("db/db.json", JSON.stringify(db), function (err, data) {
            result.json(JSON.parse(data));
        });
    });
});

app.delete("/api/notes/:id", function (req, res) {
    const { id } = req.params;
    // read the db file
    fs.readFile("db/db.json", "utf8", function (err, data) {
        const db = JSON.parse(data);
        // push into the array
        db.filter(id);
        // write a new file with newNotes 
        fs.writeFile("db/db.json", JSON.stringify(db), function (err, data) {
            res.json(JSON.parse(data));
        });
    });
});

// Basic route that sends the user first to the AJAX Page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// listen to the port and allows it to run
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
