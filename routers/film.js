const router = require("express").Router();
const {Film} = require("../models/film");
const _ = require("lodash");
const {joiFilm} = require("../validation");

router.post("", async (req, res) => {
    try {
        const result = await joiFilm(req.body);
        if (result.error != null) {
            return res.status(422).send(result.error.details[0].message);
        }
    } catch (err) {
        return res.status(400).send(err);
    }

    let film = new Film(_.pick(req.body, "name", "actors", "sessions"));
    try {
        film = await film.save();
        return res.status(200).send(film);
    } catch (err) {
        return res.status(500).send(err);
    }
});

router.get("", async (req, res) => {
    try {
        const films = await Film.find();
        return res.status(200).send(films);
    } catch (err) {
        return res.send(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const film = await Film.findById(req.params.id);
        return res.status(200).send(film);
    } catch (err) {
        return res.send(err);
    }
});

router.put("/:id", async (req, res) => {
    try {
        let film = await Film.findById(req.params.id);
        film = _.merge(film, req.body);
        film = await film.save();
        return res.status(200).send(film);
    } catch (err) {
        return res.send(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let film = await Film.findByIdAndDelete(req.params.id);
        return res.status(200).send(film);
    } catch (err) {
        return res.send(err);
    }
});

module.exports = router;
