// Filename: src/index.js
// Purpose: Main CLI program configuration - initializes Commander and registers all commands
// Author: Etim Daniel Udeme (@Dannysnotepad)
// Date: 2024-01-11

const { Command } = require('commander');
const createCommand = require('./lib/commands/create');
const helpCommand = require('./lib/commands/help');

// Create new Commander instance
const program = new Command();

// Configure main program details
program
  .name('zorx')
  .description('a cli tool for smart project scaffolding and boilerplate code generation')
  .version('0.1.0');

// Register commands
program.addCommand(createCommand);

// Disable built-in help command to use our custom one
program.addHelpCommand(false);

// Register custom help command
program.addCommand(helpCommand);

// Set up help option to use our custom help command
program.helpOption('-h, --help', 'Display help for command');

// Export program instance
module.exports = program;