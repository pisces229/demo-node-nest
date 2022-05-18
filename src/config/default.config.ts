import { registerAs } from '@nestjs/config';

export default registerAs('default', () => {
  //process.env.
  return {
    server: {
      environment: process.env.APP_SERVER_ENVIRONMENT,
      port: process.env.APP_SERVER_PORT,
    },
    database: {
      default: {
        database: process.env.APP_DATABASE_DEFAULT_DATABASE,
      },
    },
  };
});
