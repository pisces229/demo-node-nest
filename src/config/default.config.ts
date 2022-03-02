import { registerAs } from '@nestjs/config';

export default registerAs('default', () => {
  const value = 'Value';
  return { value };
});
