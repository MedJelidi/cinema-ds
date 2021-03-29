const express = require("express");
const app = express();

const film = require("./routers/film");
const session = require("./routers/session");
const reservation = require("./routers/reservation");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());
app.use("/api/film", film);
app.use("/api/session", session);
app.use("/api/reservation", reservation);

mongoose
    .connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to database...");
        app.listen(PORT, () => console.log(`Server running on ${PORT}`));
    })
    .catch((err) => {
        console.log("Error connecting to database...", err);
        process.exit(1);
    });

// const MongoClient = require("mongodb").MongoClient;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect((err) => {
//   const testCollection = client.db("testbd").collection("testcollection");
//   testCollection.find({}).toArray((err, docs) => console.log(docs));
//   // perform actions on the collection object
//   client.close().then();
// });
