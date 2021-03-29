const router = require("express").Router();
const {Film} = require("../models/film");
const Reservation = require("../models/reservation");
const mongoose = require("mongoose");

router.post("/:name/:id", async (req, res) => {
    try {
        let film = await Film.aggregate([
            {$match: {name: req.params.name}},
            {$unwind: '$sessions'},
            {$match: {'sessions._id': mongoose.Types.ObjectId(req.params.id)}},
        ]);
        if (film.length === 1) {
            if (film[0].sessions.placeNumber > 0) {
                await Film.updateOne({'sessions._id': mongoose.Types.ObjectId(req.params.id)}, {
                    $set: {
                        'sessions.$.placeNumber': film[0].sessions.placeNumber - 1
                    }
                });
                let reservation = new Reservation({
                    film: film[0],
                });
                reservation = await reservation.save();
                return res.status(200).send(reservation);
            }
            return res.status(404).send('No places left to reserve.');
        }
        return res.status(404).send('Cannot find the film and session required.');
    } catch (err) {
        return res.status(401).send(err);
    }
});

module.exports = router;
