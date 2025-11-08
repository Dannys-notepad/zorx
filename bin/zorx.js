#!/usr/bin/env node

// Filename: bin/zorx.js
// Purpose: CLI entry point - makes Zorx executable and triggers command parsing
// Author: Etim Daniel Udeme (@Dannysnotepad)
// Date: 2024-01-11

// Import main program and process utilities
const program = require('../src/index');
const processManager = require('../src/utils/processManager');

// Initialize process management for graceful error handling
processManager.setupProcessHandlers();
processManager.setupDevelopmentEnvironment();

// Verify Node.js version compatibility
if (!processManager.validateNodeVersion('16.0.0')) {
  processManager.gracefulShutdown(null, 1);
}

// Start CLI command parsing and execution
program.parse();