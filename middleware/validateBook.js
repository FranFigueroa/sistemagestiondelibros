const Joi = require('joi');

const bookSchema = Joi.object({
  title: Joi.string().min(3).required(),
  author: Joi.string().min(3).required(),
  year: Joi.number().integer().min(1000).max(new Date().getFullYear()).optional(),
  genre: Joi.string().optional(),
});

const validateBook = (req, res, next) => {
  const { error } = bookSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateBook;
