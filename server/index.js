// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes/routes");
const app = express();
const username = "root";
const password = "root";
const cluster = "cluster0.sbfcr";
const dbname = "Cluster0";

mongoose.connect(
    `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.clear()
    console.log("Connected successfully");
});
app.use(Router);

app.listen(3000, () => {
    console.log("Server is running at port 3000");
});
