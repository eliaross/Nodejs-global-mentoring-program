import Joi from 'joi';
import express from 'express';
import { Permission } from '../../interfaces/group.interface';

export const validateGroup = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array()
      .items(Joi.string().valid(...Object.values(Permission)))
      .optional()
  });

  try {
    await schema.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

  next();
};
