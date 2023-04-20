import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgres: {
      DATABASE_URL: process.env.DATABASE_URL,
    },
  };
});
