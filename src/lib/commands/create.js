// Filename: lib/commands/create.js
// Purpose: Defines the 'create' command for project scaffolding with various configuration options
// Author: Etim Daniel Udeme (@Dannysnotepad)


const { Command } = require('commander');
const createProject = require('../core/createProject');
const log = require('../../utils/logger');


const createCommand = new Command('create');

// Configure command options and behavior
createCommand
  .description('Create a new project')
  .argument('<project-name>', 'name of the project')
  .option('--force', 'Overide and recreate a directory if it already exists')
  .option('--ts', 'Use typscript')
  .option('--port <port>', 'Specify custom port', '3000')
  .option('--skip-install', 'Skip dependency installation')
  .option('--install <packages>', 'Extra packages (comma separated)', val => val.split(','), [])
  .option('--pm <package-manager>', '--package-manager <package-manager>', 'Specify node package manager (default: npm)', 'npm')
  .action(async (projectName, options) => {
    try {
      // Delegate project creation to the core logic module
      await createProject(projectName, options);
    } catch (e) {
      // Log error and exit with failure code if project creation fails
      log.error(e);
      process.exit(1);
    }
  });

// Export command for registration in main CLI program
module.exports = createCommand;