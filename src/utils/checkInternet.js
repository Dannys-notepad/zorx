// Filename: utils/checkInterneg.js
// Purpose: Utility function to check for active internet connection by DNS lookup
// Author: Etim Daniel Udeme (@Dannysnotepad)


const dns = require('dns');
const { promisify } = require('util');

// Convert callback-based dns.lookup to Promise-based for async/await usage
const dnsLookup = promisify(dns.lookup);


async function hasInternetConnection() {
  try {
    // Attempt DNS lookup - successful resolution indicates internet connectivity
    await dnsLookup('google.com');
    return true;
  } catch (error) {
    // DNS lookup failed - likely no internet connection or DNS issues but since google.com is always active it's definitely no internet connection 
    return false;
  }
}

module.exports = hasInternetConnection;