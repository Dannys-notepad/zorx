const program = require('./index');

describe('CLI main entry point', () => {
  it('should export something without throwing', () => {
    expect(program).toBeDefined();
    expect(typeof program).toBe('object');
  });
});
