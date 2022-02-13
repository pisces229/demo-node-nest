import { TestFirstMiddleware } from './test-first.middleware';

describe('TestFirstMiddleware', () => {
  it('should be defined', () => {
    expect(new TestFirstMiddleware()).toBeDefined();
  });
});
