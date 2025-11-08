// Filename: utils/processManager.js
// Purpose: Centralized process management utilities for handling errors, exits, and signals
// Author: Your Name (@yourhandle)
// Date: 2024-01-11

const log = require('./logger');

// =====================
// Process Management Utilities
// =====================

/**
 * Gracefully shuts down the application with proper cleanup
 * @param {string} message - Optional message to log before exiting
 * @param {number} code - Exit code (0 for success, 1 for error)
 */
function gracefulShutdown(message = 'Shutting down...', code = 0) {
  if (message) {
    code === 0 ? log.success(message) : log.error(message);
  }
  
  // Perform any necessary cleanup here
  // Example: close database connections, cleanup temp files, etc.
  
  process.exit(code);
}

/**
 * Handles uncaught exceptions and unhandled promise rejections
 * @param {Error} error - The uncaught error
 * @param {string} source - Source of the error ('uncaughtException' or 'unhandledRejection')
 */
function handleFatalError(error, source) {
  log.error(`Fatal Error (${source}):`, error);
  
  // Log additional context for debugging
  console.error('Stack trace:', error.stack);
  
  // Exit with error code after a brief delay to ensure logs are written
  setTimeout(() => {
    process.exit(1);
  }, 100);
}

/**
 * Sets up process event listeners for graceful error handling
 */
function setupProcessHandlers() {
  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    handleFatalError(error, 'uncaughtException');
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    const error = reason instanceof Error ? reason : new Error(String(reason));
    handleFatalError(error, 'unhandledRejection');
  });

  // Handle termination signals
  process.on('SIGINT', () => {
    gracefulShutdown('Process interrupted (SIGINT)');
  });

  process.on('SIGTERM', () => {
    gracefulShutdown('Process terminated (SIGTERM)');
  });

  // Handle exit event for final cleanup
  process.on('exit', (code) => {
    const message = `Process exited with code ${code}`;
    code === 0 ? log.success(message) : log.normal(message);
  });
}

/**
 * Validates current Node.js version meets minimum requirements
 * @param {string} minVersion - Minimum required Node.js version (e.g., '16.0.0')
 * @returns {boolean} True if version meets requirements, false otherwise
 */
function validateNodeVersion(minVersion = '16.0.0') {
  const currentVersion = process.version.slice(1); // Remove 'v' prefix
  const [currentMajor] = currentVersion.split('.').map(Number);
  const [minMajor] = minVersion.split('.').map(Number);

  if (currentMajor < minMajor) {
    log.error(`Node.js version ${minVersion} or higher is required. Current version: ${currentVersion}`);
    return false;
  }

  return true;
}

/**
 * Gets process memory usage in human-readable format
 * @returns {object} Memory usage statistics
 */
function getMemoryUsage() {
  const usage = process.memoryUsage();
  
  return {
    rss: `${Math.round(usage.rss / 1024 / 1024)} MB`,
    heapTotal: `${Math.round(usage.heapTotal / 1024 / 1024)} MB`,
    heapUsed: `${Math.round(usage.heapUsed / 1024 / 1024)} MB`,
    external: `${Math.round(usage.external / 1024 / 1024)} MB`
  };
}

/**
 * Checks if the process is running in development mode
 * @returns {boolean} True if running in development environment
 */
function isDevelopment() {
  return process.env.NODE_ENV === 'development';
}

/**
 * Sets up development environment variables and behaviors
 */
function setupDevelopmentEnvironment() {
  if (isDevelopment()) {
    // Enable more verbose logging in development
    log.setLevel('debug');
    
    // Add source map support for better error traces
    try {
      require('source-map-support').install();
    } catch (error) {
      log.normal('Source map support not available');
    }
  }
}

// Export process management utilities
module.exports = {
  gracefulShutdown,
  handleFatalError,
  setupProcessHandlers,
  validateNodeVersion,
  getMemoryUsage,
  isDevelopment,
  setupDevelopmentEnvironment
};