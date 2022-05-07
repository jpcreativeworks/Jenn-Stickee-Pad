const express = require("express");
const path = require("path");
const fs = require("fs");
const { Server } = require("http");

const PORT = 8080;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static ('public'));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

console.log('server listening on localhost:8080');
app.listen(8080);