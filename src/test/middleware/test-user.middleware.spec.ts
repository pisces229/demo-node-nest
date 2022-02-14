import { TestUserMiddleware } from './test-user.middleware';

describe('TestUserMiddleware', () => {
  it('should be defined', () => {
    expect(new TestUserMiddleware()).toBeDefined();
  });
});
