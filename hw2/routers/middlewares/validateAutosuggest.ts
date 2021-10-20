import Joi from 'joi';
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export const autosuggestQuerySchema = Joi.object({
  limit: Joi.number().min(1),
  loginSubstring: Joi.string().min(1)
});

export interface AutosuggestRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    limit?: number;
    loginSubstring?: string;
  };
}
