const express = require("express");
const path = require("path");
const fs = require("fs");
const { Server } = require("http");

const PORT = 8080;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static ('public'));

//homepage path
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});
//notes path
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/notes.html"));
});
//get note
app.get("/api/notes", (req, res) =>{
    fs.readFile(path.join(__dirname + "/db/db.json"), "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        res.setHeader("Content-Type", "application/json");
        res.send(data);
    });
});

console.log('server listening on localhost:8080');
app.listen(8080);