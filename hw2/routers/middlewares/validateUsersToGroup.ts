import Joi from 'joi';
import express from 'express';

export const validateUsersToGroup = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const schema = Joi.object({
    usersIds: Joi.array().items(Joi.string()).required()
  });

  try {
    await schema.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

  next();
};
