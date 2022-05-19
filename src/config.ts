import { registerAs } from '@nestjs/config';

export default registerAs('', () => {
  return {
    environment: process.env.APP_ENVIRONMENT,
    port: process.env.APP_PORT,
    database: process.env.APP_DATABASE,
    dest: {
      upload: process.env.APP_DEST_UPLOAD,
      temp: process.env.APP_DEST_TEMP,
    },
    casbin: {
      model: process.env.APP_CASBIN_MODEL,
      policy: process.env.APP_CASBIN_POLICY,
    },
    jwt: {
      secret: process.env.APP_JWT_SECRET,
      expiresIn: process.env.APP_JWT_EXPIRES_IN,
    },
  };
});
