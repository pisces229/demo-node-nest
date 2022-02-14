import { TestRoleMiddleware } from './test-role.middleware';

describe('TestRoleMiddleware', () => {
  it('should be defined', () => {
    expect(new TestRoleMiddleware()).toBeDefined();
  });
});
