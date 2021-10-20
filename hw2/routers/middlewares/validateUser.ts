import Joi from 'joi';
import express from 'express';

export const validateUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const schema = Joi.object({
    login: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    age: Joi.number().min(4).max(130).required()
  });

  try {
    await schema.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

  next();
};
