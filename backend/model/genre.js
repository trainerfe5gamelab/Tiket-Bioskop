const Joi = require("joi");

const genreValidate = Joi.object({
  name_genre: Joi.string().max(100).required().messages({
    "string.max": "nama genre maxsimal 100 kata",
    "any.required": "Nama genre tidak boleh kosong",
  }),
});

module.exports = genreValidate;
