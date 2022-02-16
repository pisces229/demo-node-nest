import { DemoSecondMiddleware } from './demo-second.middleware';

describe('DemoSecondMiddleware', () => {
  it('should be defined', () => {
    expect(new DemoSecondMiddleware()).toBeDefined();
  });
});
