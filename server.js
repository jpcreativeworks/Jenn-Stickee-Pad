const express = require("express");
const path = require("path");
const fs = require("fs");
const { error } = require("console");


const app = express();

app.use(express.json());

app.use(express.static('public'));

//homepage path
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});
//notes path
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/notes.html"));
});
//get note
app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname + "/db/db.json"), "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        res.setHeader("Content-Type", "application/json");
        res.send(data);
    });
});
//write note
app.post("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname + "/db/db.json"), "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        let currentData = JSON.parse(data);

        let fullPath = path.join(__dirname + "/db/db.json");
        console.log(fullPath);
        console.log(req.body);
        currentData.push(req.body);
        fs.writeFile(fullPath, JSON.stringify(currentData), (error) => {
            if (error) {
                console.error(error);
            }
        });
        res.send(currentData);
    });
});

app.delete("/api/notes/:id", (req,res) => {
    let id = req.params.id;
    fs.readFile(path.join(__dirname + "/db/db.json"), "utf8", (err, data) =>{
        if (err) {
            console.error(err);
            return;
        }
        let currentData = JSON.parse(data);
        currentData = currentData.filter((value) => value.id !== parseInt(id));
        let fullPath = path.join(__dirname + "/db/db.json");
        fs.writeFile(fullPath, JSON.stringify(currentData), (error) => {
            if (error) {
                console.error(error);
            }
        });
        res.send(currentData);
    });
});

console.log('server listening on localhost:8080');
app.listen(process.env.PORT || 3000);