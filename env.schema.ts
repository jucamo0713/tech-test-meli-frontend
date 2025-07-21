import Joi from 'joi';

/**
 * Joi schema for validating the environment variables used in the API.
 */
export const EnvSchema: Joi.ObjectSchema = Joi.object({
    VITE_BACKEND_BASE_URL: Joi.string().uri().required(),
})
    .options({ presence: 'required' })
    .required();
