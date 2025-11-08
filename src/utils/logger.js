// Filename: utils/logger.js
// Purpose: Enhanced logging utility with colors, formatting, and log levels for better CLI output
// Author: Your Name (@yourhandle)
// Date: 2024-01-11

// =====================
// ANSI Color Codes
// =====================

/**
 * ANSI escape codes for terminal colors and formatting
 * Using more comprehensive color definitions for better theming
 */
const COLORS = {
  // Basic colors
  RESET: '\x1b[0m',
  BRIGHT: '\x1b[1m',
  DIM: '\x1b[2m',
  UNDERSCORE: '\x1b[4m',
  
  // Foreground colors
  BLACK: '\x1b[30m',
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  MAGENTA: '\x1b[35m',
  CYAN: '\x1b[36m',
  WHITE: '\x1b[37m',
  
  // Background colors
  BG_BLACK: '\x1b[40m',
  BG_RED: '\x1b[41m',
  BG_GREEN: '\x1b[42m',
  BG_YELLOW: '\x1b[43m',
  BG_BLUE: '\x1b[44m',
  BG_MAGENTA: '\x1b[45m',
  BG_CYAN: '\x1b[46m',
  BG_WHITE: '\x1b[47m'
};

// =====================
// Log Levels Configuration
// =====================

/**
 * Available log levels with their priorities
 * Lower number = higher priority
 */
const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  SUCCESS: 3,
  NORMAL: 4,
  DEBUG: 5
};

// Current log level (can be changed dynamically)
let currentLogLevel = LOG_LEVELS.NORMAL;

// =====================
// Core Logging Functions
// =====================

/**
 * Base logging function with level checking and formatting
 * @param {string} level - Log level from LOG_LEVELS
 * @param {string} color - ANSI color code
 * @param {string} prefix - Prefix symbol for the log
 * @param {...any} messages - Messages to log
 */
function log(level, color, prefix, ...messages) {
  // Check if current log level allows this message
  if (level > currentLogLevel) return;
  
  // Format the message with color and prefix
  const formattedMessage = messages.map(msg => 
    typeof msg === 'string' ? msg : JSON.stringify(msg, null, 2)
  ).join(' ');
  
  // Create the final output with colors and formatting
  const output = `${color}${prefix ? prefix + ' ' : ''}${formattedMessage}${COLORS.RESET}`;
  
  // Use appropriate console method based on level
  if (level === LOG_LEVELS.ERROR) {
    console.error(output);
  } else if (level === LOG_LEVELS.WARN) {
    console.warn(output);
  } else {
    console.log(output);
  }
}

/**
 * Normal log output for general information
 * @param {...any} messages - Messages to log
 */
function normal(...messages) {
  log(LOG_LEVELS.NORMAL, COLORS.RESET, '', ...messages);
}

/**
 * Info log for informational messages
 * @param {...any} messages - Messages to log
 */
function info(...messages) {
  log(LOG_LEVELS.INFO, COLORS.CYAN, 'ℹ', ...messages);
}

/**
 * Success log for positive outcomes and completions
 * @param {...any} messages - Messages to log
 */
function success(...messages) {
  log(LOG_LEVELS.SUCCESS, COLORS.GREEN, '✅', ...messages);
}

/**
 * Warning log for potential issues
 * @param {...any} messages - Messages to log
 */
function warn(...messages) {
  log(LOG_LEVELS.WARN, COLORS.YELLOW, '⚠', ...messages);
}

/**
 * Error log for failures and critical issues
 * @param {...any} messages - Messages to log
 */
function error(...messages) {
  log(LOG_LEVELS.ERROR, COLORS.RED, '❌', ...messages);
}

/**
 * Debug log for development and troubleshooting
 * @param {...any} messages - Messages to log
 */
function debug(...messages) {
  log(LOG_LEVELS.DEBUG, COLORS.MAGENTA, '🐛', ...messages);
}

/**
 * Header log for section separators and titles
 * @param {string} title - Header title
 * @param {string} symbol - Optional symbol for the header
 */
function header(title, symbol = '=') {
  if (LOG_LEVELS.NORMAL > currentLogLevel) return;
  
  const line = symbol.repeat(Math.max(20, title.length + 4));
  console.log(`\n${COLORS.BRIGHT}${COLORS.BLUE}${line}${COLORS.RESET}`);
  console.log(`${COLORS.BRIGHT}${COLORS.BLUE}  ${title}${COLORS.RESET}`);
  console.log(`${COLORS.BRIGHT}${COLORS.BLUE}${line}${COLORS.RESET}\n`);
}

/**
 * Progress log for showing progress indicators
 * @param {string} message - Progress message
 * @param {number} current - Current progress
 * @param {number} total - Total steps
 */
function progress(message, current, total) {
  if (LOG_LEVELS.INFO > currentLogLevel) return;
  
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  const progressBar = createProgressBar(current, total);
  
  log(LOG_LEVELS.INFO, COLORS.BLUE, '🔄', `${message} ${progressBar} (${percentage}%)`);
}

// =====================
// Utility Functions
// =====================

/**
 * Creates a simple text-based progress bar
 * @param {number} current - Current progress
 * @param {number} total - Total steps
 * @param {number} width - Width of the progress bar
 * @returns {string} Progress bar string
 */
function createProgressBar(current, total, width = 20) {
  if (total === 0) return '[]';
  
  const percentage = current / total;
  const completed = Math.round(width * percentage);
  const remaining = width - completed;
  
  return `[${'█'.repeat(completed)}${'░'.repeat(remaining)}]`;
}

/**
 * Sets the current log level
 * @param {string} level - Log level name ('ERROR', 'WARN', 'INFO', 'SUCCESS', 'NORMAL', 'DEBUG')
 */
function setLevel(level) {
  const upperLevel = level.toUpperCase();
  if (LOG_LEVELS[upperLevel] !== undefined) {
    currentLogLevel = LOG_LEVELS[upperLevel];
    debug(`Log level set to: ${upperLevel}`);
  } else {
    warn(`Invalid log level: ${level}. Using default: NORMAL`);
  }
}

/**
 * Gets the current log level name
 * @returns {string} Current log level name
 */
function getLevel() {
  return Object.keys(LOG_LEVELS).find(key => LOG_LEVELS[key] === currentLogLevel);
}

/**
 * Checks if a specific log level is enabled
 * @param {string} level - Log level to check
 * @returns {boolean} True if the level is enabled
 */
function isLevelEnabled(level) {
  return LOG_LEVELS[level.toUpperCase()] <= currentLogLevel;
}

// =====================
// Export Logger Interface
// =====================

module.exports = {
  // Core logging functions
  normal,
  info,
  success,
  warn,
  error,
  debug,
  header,
  progress,
  
  // Log level management
  setLevel,
  getLevel,
  isLevelEnabled,
  
  // Constants for external use
  COLORS,
  LOG_LEVELS
};