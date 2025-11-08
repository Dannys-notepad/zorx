// Filename: lib/commands/help.js
// Purpose: Custom help command to provide enhanced documentation and examples
// Author: Etim Daniel Udeme (@Dannysnotepad)
// Date: 2024-01-11

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
  log.normal('  --ts                     Use TypeScript template');
  log.normal('  --port <port>            Specify custom server port (default: 3000)');
  log.normal('  --skip-install           Skip dependency installation');
  log.normal('  --install <packages>     Extra packages (comma separated)');
  log.normal('  --template <template>    Use specific project template');
  log.normal('  --git                    Initialize git repository');
  log.normal('  --package-manager <pm>   Specify package manager (npm, yarn, pnpm, bun)\n');

  log.header('EXAMPLES');
  log.normal('  # Basic project creation');
  log.success('  zorx create my-api\n');
  log.normal('  # TypeScript project with custom port');
  log.success('  zorx create my-api --ts --port 8080\n');
  log.normal('  # Project with additional packages');
  log.success('  zorx create my-api --install "cors,helmet,morgan"\n');

  log.header('QUICK START');
  log.normal('  1. zorx create my-project');
  log.normal('  2. cd my-project');
  log.normal('  3. npm run dev');
  log.normal('  4. Open http://localhost:3000\n');

  log.header('SUPPORT');
  log.info('  GitHub: https://github.com/Dannys-notepad/zorx');
  log.info('  Issues: https://github.com/Dannys-notepad/zorx/issues\n');

  log.normal('Run `zorx <command> --help` for specific command information');
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
      log.normal('  --ts                  Generate TypeScript project');
      log.normal('  --port <number>       Server port (default: 3000)');
      log.normal('  --skip-install        Skip npm installation');
      log.normal('  --install <list>      Additional packages (comma-separated)');
      log.normal('  --template <name>     Project template to use');
      log.normal('  --git                 Initialize git repository');
      log.normal('  --package-manager     npm, yarn, pnpm, or bun\n');
      
      log.header('TEMPLATES');
      log.success('  express-basic        Basic Express.js API (default)');
      log.success('  express-ts           Express.js with TypeScript');
      log.success('  rest-api             REST API with CRUD operations');
      log.success('  minimal              Minimal setup with fewer dependencies\n');
      
      log.header('EXAMPLES');
      log.success('  zorx create my-app');
      log.success('  zorx create my-api --ts --port 8080');
      log.success('  zorx create my-project --install "cors,helmet" --git');
      break;
      
    default:
      log.warn(`No detailed help available for: ${commandName}`);
      log.info('Run `zorx help` for general usage information.');
  }
}

// Initialize help command
const helpCommand = new Command('hhelp');

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

helpCommand.addHelpText('after', '\nEXAMPLES:\n  zorx help\n  zorx help create\n');

module.exports = helpCommand;