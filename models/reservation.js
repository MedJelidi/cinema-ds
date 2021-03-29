const mongoose = require("mongoose");
const {FilmSchema} = require("./film");

const Reservation = mongoose.model(
    "Reservation",
    new mongoose.Schema({
        film: {type: FilmSchema, required: true},
    })
);

module.exports = Reservation;
