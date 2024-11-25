import * as Joi from 'joi';

export const updateTaskSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  metadata: Joi.object().optional(),
}).min(1);
