const express = require("express");
const parth = require("path");
const fs = require("fs");

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static ('public'));