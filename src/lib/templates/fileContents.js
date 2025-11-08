// Filename: templates/projectTemplates.js (or appropriate path)
// Purpose: Template generators for project files - provides dynamic content for scaffolded projects
// Author: Your Name (@yourhandle)
// Date: 2024-01-11

// =====================
// Project File Templates
// =====================

/**
 * Generates the main application file content with Express.js configuration
 * @param {string|number} port - The port number for the Express server
 * @returns {string} Complete app.js file content with configured port
 */
function appFileContent(port) {
  return `
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const mainRoute = require('./src/routes/main.route');

const app = express();
const PORT = process.env.PORT || ${port || 3000};

// Middleware setup for security and data parsing
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

// Routes
app.use('/', mainRoute);

// Start server
app.listen(PORT, () => console.log('Server up and running on port ${port}'));
`
}

/**
 * Generates the main route file content with basic endpoint
 * @returns {string} Route file content with root endpoint
 */
function routeFileContent() {
  return `
const router = require('express').Router();
const { mainEndpoint } = require('../controllers/main.controller');

// Root endpoint route
router.get('/', mainEndpoint);

module.exports = router;
  `
}

/**
 * Generates the main controller file content with API endpoint logic
 * @returns {string} Controller file content with main endpoint handler
 */
function controllerFileContent() {
  return `

const mainEndpoint = async (req, res) => {
  try {
    // Success response for root endpoint
    res.status(200).json({res: 'Your API is up and running  🚀'})
  } catch (e) {
    // Error handling for server issues
    console.error(e)
    res.status(500).json({res: 'Server Error'})
  }
}

module.exports = {
  mainEndpoint
}
  `
}

/**
 * Generates package.json content with project-specific configuration
 * @param {string} projectName - Name of the project for package.json
 * @returns {string} package.json file content with basic npm scripts
 */
 
function packageJsonFileContent(projectName) {
  return {
    name: projectName,
    version: "1.0.0",
    description: "",
    main: "app.js",
    scripts: {
      start: "node app.js",
      dev: "node --watch app.js"
    },
    keywords: [],
    author: "",
    license: "ISC",
    type: "commonjs"
  };
}

// Export all template functions for use in project scaffolding
module.exports = {
  appFileContent,
  routeFileContent,
  controllerFileContent,
  packageJsonFileContent
}