import { TestRoleGuard } from './test-role.guard';

describe('TestRoleGuard', () => {
  it('should be defined', () => {
    expect(new TestRoleGuard()).toBeDefined();
  });
});
