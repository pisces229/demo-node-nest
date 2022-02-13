import { TestSecondMiddleware } from './test-second.middleware';

describe('TestSecondMiddleware', () => {
  it('should be defined', () => {
    expect(new TestSecondMiddleware()).toBeDefined();
  });
});
