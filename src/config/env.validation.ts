import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('production', 'development', 'test', 'staging')
    .default('development'),
  DATABASE_PORT: Joi.number().port().default(5432),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
});
