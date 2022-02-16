import { registerAs } from '@nestjs/config';

export default registerAs('demo', () => {
  const value = 'DEMO';
  return { value };
});
