const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    duration: { type: String, required: true },
    placeNumber: { type: Number, required: true},
})

const Session = mongoose.model(
    "Session",
    SessionSchema
);

module.exports.Session = Session;
module.exports.SessionSchema = SessionSchema;
