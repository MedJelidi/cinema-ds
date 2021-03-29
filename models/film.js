const mongoose = require("mongoose");
const {SessionSchema} = require("./session");

const FilmSchema = new mongoose.Schema({
    name: {type: String, required: true },
    actors: {type: [String], required: true},
    sessions: {type: [SessionSchema], required: true}
});

const Film = mongoose.model(
    "Film",
    FilmSchema
);

module.exports.FilmSchema = FilmSchema;
module.exports.Film = Film;
