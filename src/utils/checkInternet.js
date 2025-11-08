// Filename: utils/hasInternetConnection.js
// Purpose: Utility function to check for active internet connection by DNS lookup
// Author: Your Name (@yourhandle)
// Date: 2024-01-11

const dns = require('dns');
const { promisify } = require('util');

// Convert callback-based dns.lookup to Promise-based for async/await usage
const dnsLookup = promisify(dns.lookup);

/**
 * Checks if the system has an active internet connection
 * by performing a DNS lookup to google.com
 * @returns {Promise<boolean>} True if internet connection is available, false otherwise
 */
async function hasInternetConnection() {
  try {
    // Attempt DNS lookup - successful resolution indicates internet connectivity
    await dnsLookup('google.com');
    return true;
  } catch (error) {
    // DNS lookup failed - likely no internet connection or DNS issues
    return false;
  }
}

module.exports = hasInternetConnection;