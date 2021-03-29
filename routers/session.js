const router = require("express").Router();
const {Session} = require("../models/session");
const _ = require("lodash");
const {joiSession} = require("../validation");

router.post("", async (req, res) => {
    try {
        const result = await joiSession(req.body);
        if (result.error != null) {
            return res.status(422).send(result.error.details[0].message);
        }
    } catch (err) {
        return res.status(400).send(err);
    }

    let session = new Session(_.pick(req.body, "date", "duration", "placeNumber"));
    try {
        session = await session.save();
        return res.status(200).send(session);
    } catch (err) {
        return res.status(500).send(err);
    }
});

router.get("", async (req, res) => {
    try {
        const sessions = await Session.find();
        return res.status(200).send(sessions);
    } catch (err) {
        return res.send(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        return res.status(200).send(session);
    } catch (err) {
        return res.send(err);
    }
});

router.put("/:id", async (req, res) => {
    try {
        let session = await Session.findById(req.params.id);
        session = _.merge(session, req.body);
        session = await session.save();
        return res.status(200).send(session);
    } catch (err) {
        return res.send(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let session = await Session.findByIdAndDelete(req.params.id);
        return res.status(200).send(session);
    } catch (err) {
        return res.send(err);
    }
})

module.exports = router;
