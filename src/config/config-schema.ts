import * as Joi from 'joi';

const configSchema: any = Joi.object({
  NODE_ENV: Joi.string()
    .valid('dev', 'production', 'test', 'provision')
    .default('dev'),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_HOST: Joi.string().hostname().required(),
});

export default configSchema;
