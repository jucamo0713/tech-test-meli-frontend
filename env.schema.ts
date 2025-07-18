import Joi from 'joi';

/**
 * Joi schema for validating the environment variables used in the API.
 */
export const EnvSchema: Joi.ObjectSchema = Joi.object({}).options({ presence: 'required' }).required();
