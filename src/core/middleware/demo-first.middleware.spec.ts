import { DemoFirstMiddleware } from './demo-first.middleware';

describe('DemoFirstMiddleware', () => {
  it('should be defined', () => {
    expect(new DemoFirstMiddleware()).toBeDefined();
  });
});
