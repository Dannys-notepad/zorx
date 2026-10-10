const program = require('./index');

describe('CLI main entry point', () => {
  it('should export something without throwing', () => {
    expect(program).toBeDefined();
    expect(typeof program).toBe('object');
  });

  describe('--install option parsing', () => {
    it('should parse package list with spaces the same as without spaces', () => {
      const createCmd = program.commands.find(cmd => cmd.name() === 'create');
      
      const parsedWithSpaces = createCmd.parseOptions(['--install', 'cors, helmet, morgan', 'my-app']);
      const parsedWithoutSpaces = createCmd.parseOptions(['--install', 'cors,helmet,morgan', 'my-app']);

      const optsWithSpaces = createCmd.opts();
      expect(optsWithSpaces.install).toEqual(['cors', 'helmet', 'morgan']);

      // Parse without spaces
      createCmd.parseOptions(['--install', 'cors,helmet,morgan', 'my-app']);
      const optsWithoutSpaces = createCmd.opts();
      expect(optsWithoutSpaces.install).toEqual(['cors', 'helmet', 'morgan']);
    });
  });
});
