// Filename: utils/runCommand.js
// Purpose: Utility function to execute shell commands as child processes with Promise wrapper
// Author: Etim Daniel Udeme (@Dannysnotepad)

const { spawn } = require('child_process');
const log = require('./logger');

/**
 * Executes a shell command with arguments and returns a Promise
 * @param {string} command - The command to execute (e.g., 'npm', 'git')
 * @param {string[]} args - Array of arguments for the command
 * @returns {Promise<void>} Resolves when command completes successfully, rejects on failure
 */
function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args);

    // Handle standard output
    child.stdout.on('data', (data) => {
      log.normal(data.toString().trim());
    });

    // Handle error output
    child.stderr.on('data', (data) => {
      log.error(data.toString().trim());
    });

    // Handle process completion
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(`${command} failed with exit code ${code}`);
      }
    });
  });
}

module.exports = runCommand;