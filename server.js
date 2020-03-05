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

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// app.get("/api/notes", function (req, res) {
//     fs.readFile("db/db.son", "utf8", function (err, data) {
//         res.json(JSON.parse(data));
//     })
// })

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
