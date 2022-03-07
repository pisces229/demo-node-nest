import { registerAs } from '@nestjs/config';

export default registerAs('default', () => {
  //process.env.
  return {
    server: {
      environment: process.env.SERVER_ENVIRONMENT,
      port: process.env.SERVER_PORT,
    },
    database: {
      default: {
        database: process.env.DATABASE_DEFAULT_DATABASE,
      },
    },
  };
});
