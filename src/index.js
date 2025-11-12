// Filename: src/index.js
// Purpose: Main CLI program configuration - initializes Commander and registers all commands
// Author: Etim Daniel Udeme (@Dannysnotepad)

const { Command } = require('commander');
const createCommand = require('./lib/commands/create');
const helpCommand = require('./lib/commands/help');


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

// Set up help option to use my moo custom help command
program.helpOption('-h, --help', 'Display help for command');


module.exports = program;