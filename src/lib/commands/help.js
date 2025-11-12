// Filename: lib/commands/help.js
// Purpose: Custom help command to provide enhanced documentation and examples
// Author: Etim Daniel Udeme (@Dannysnotepad)

const { Command } = require('commander');
const figlet = require('figlet');
const log = require('../../utils/logger');

/**
 * Displays enhanced help information with examples and usage patterns
 */
function displayEnhancedHelp() {
  // Display Zorx banner
  try {
    console.log(figlet.textSync('Zorx CLI', { horizontalLayout: 'full' }));
  } catch (e) {
    log.normal('ZORX CLI');
  }
  
  log.info('A smart CLI tool for rapid project scaffolding and boilerplate code generation\n');

  log.header('USAGE');
  log.normal('  zorx <command> [options]\n');

  log.header('COMMANDS');
  log.normal('  create <project-name>    Create a new project');
  log.normal('  help                     Show this help message');
  log.normal('  version                  Show version information\n');

  log.header('CREATE COMMAND');
  log.normal('  zorx create <project-name> [options]\n');
  
  log.header('OPTIONS');
  log.normal('  --force                  Override and recreate directory if it exists');
  log.normal('  --port <port>            Specify custom server port (default: 3000)');
  log.normal('  --skip-install           Skip dependency installation');
  log.normal('  --install <packages>     Extra packages (comma separated)');
  log.normal('  --package-manager <pm>   Specify package manager (npm, yarn, pnpm, bun)\n');

  log.header('EXAMPLES');
  log.normal('  # Basic project creation');
  log.success('  zorx create my-api\n');
  log.normal('  # Project with additional packages');
  log.success('  zorx create my-api --install "cors,helmet,morgan"\n');
  log.normal('  # Skip installation and use specific package manager');
  log.success('  zorx create my-api --skip-install --package-manager pnpm\n');

  log.header('QUICK START');
  log.normal('  1. zorx create my-project');
  log.normal('  2. cd my-project');
  log.normal('  3. npm run dev');
  log.normal('  4. Open http://localhost:3000\n');

  log.header('COMING FEATURES');
  log.warn('  --ts                     Use TypeScript template (coming soon)');
  log.warn('  --template <template>    Use specific project template (coming soon)');
  log.warn('  --git                    Initialize git repository (coming soon)\n');

  log.header('SUPPORT');
  log.info('  GitHub: https://github.com/Dannys-notepad/zorx');
  log.info('  Issues: https://github.com/Dannys-notepad/zorx/issues');
}

/**
 * Displays help for a specific command
 * @param {string} commandName - The command to get help for
 */
function displayCommandHelp(commandName) {
  switch (commandName) {
    case 'create':
      log.header('CREATE COMMAND DETAILS');
      log.info('Create a new project with customizable options.\n');
      
      log.header('ARGUMENTS');
      log.normal('  project-name          Required. Name of the project to create\n');
      
      log.header('OPTIONS');
      log.normal('  --force               Override existing directory');
      log.normal('  --port <number>       Server port (default: 3000)');
      log.normal('  --skip-install        Skip npm installation');
      log.normal('  --install <list>      Additional packages (comma-separated)');
      log.normal('  --package-manager     npm, yarn, pnpm, or bun\n');
      
      log.header('COMING SOON');
      log.warn('  --ts                  Generate TypeScript project');
      log.warn('  --template <name>     Project template to use');
      log.warn('  --git                 Initialize git repository\n');
      
      log.header('EXAMPLES');
      log.success('  zorx create my-app');
      log.success('  zorx create my-api --install "cors,helmet"');
      log.success('  zorx create my-project --skip-install --package-manager yarn');
      break;
      
    default:
      log.warn(`No detailed help available for: ${commandName}`);
      log.info('Run `zorx help` for general usage information.');
  }
}

// Initialize help command
const helpCommand = new Command('help');

helpCommand
  .description('Display help information for Zorx CLI')
  .argument('[command]', 'Specific command to get help for')
  .action((command) => {
    if (command) {
      displayCommandHelp(command);
    } else {
      displayEnhancedHelp();
    }
  });

module.exports = helpCommand;