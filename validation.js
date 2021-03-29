const Joi = require("joi");

const sessionSchema = Joi.object({
    date: Joi.date().required(),
    duration: Joi.string().alphanum().required().max(2).pattern(new RegExp("^\\d*h$")),
    placeNumber: Joi.number().required().integer().max(100)
})
const joiSession = (session) => {
    return sessionSchema.validate(session);
}

const joiFilm = (film) => {
    const filmSchema = Joi.object({
        name: Joi.string().alphanum().required().min(2).max(30),
        actors: Joi.array().items(Joi.string()).required().min(3),
        sessions: Joi.array().items(sessionSchema).required().min(1)
    });
    return filmSchema.validate(film);
};

module.exports.joiFilm = joiFilm;
module.exports.joiSession = joiSession;
