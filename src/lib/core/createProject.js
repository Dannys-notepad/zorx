// Filename: core/createProject.js
// Purpose: Main project scaffolding logic - creates directory structure, files, and installs dependencies
// Author: Etim Daniel Udeme (@Dannysnotepad)
// Date: 2024-01-11

const fs = require('fs-extra');
const path = require('path');
const log = require('../../utils/logger');
const runCommand = require('../../utils/runCommand');
const hasInternetConnection = require('../../utils/checkInternet');
const processManager = require('../../utils/processManager');
const { 
  appFileContent, 
  routeFileContent, 
  controllerFileContent, 
  packageJsonFileContent 
} = require('../templates/fileContents');

async function createProject(projectName, options) {
  try {
    log.header('Project Creation');
    log.info(`Creating project: ${projectName}`);
    
    const projectPath = path.join(process.cwd(), projectName);
    
    // Validate project directory
    const override = options?.force;
    const pathExists = await checkDir(projectPath, override);
    
    if (pathExists && !override) {
      log.warn(`Directory ${projectName} already exists`);
      log.info('Use --force to override existing directory');
      processManager.gracefulShutdown(null, 1);
    }
    
    if (override) {
      log.info('Removing existing directory...');
      await fs.remove(projectPath);
    }
    
    // Create project structure
    log.info('Creating project directory...');
    await fs.ensureDir(projectPath);
    
    log.progress('Creating project structure', 1, 5);
    await createDirsJs(projectPath);
    
    log.progress('Creating project files', 2, 5);
    await createFilesJs();
    
    log.progress('Writing template files', 3, 5);
    const port = options?.port;
    await writeToFilesJs(projectPath, port);
    
    // Initialize package manager
    log.progress('Initializing package manager', 4, 5);
    await initPackageManager(options?.packageManager);
    
    // Handle package.json
    const packageFileExist = await fs.pathExists(path.join(projectPath, 'package.json'));
    if (packageFileExist) {
      await fs.writeJson(path.join(projectPath, 'package.json'), packageJsonFileContent(projectName), { spaces: 2 });
    }
    
    // Install dependencies
    if (!options.skipInstall) {
      log.progress('Installing dependencies', 5, 5);
      
      const hasInternet = await hasInternetConnection();
      if (!hasInternet) {
        log.warn('No internet connection detected');
        log.info('Install dependencies manually when connected');
      } else {
        await installPackages(options?.packageManager, options?.install);
      }
    }
    
    // Completion
    log.success(`Project ${projectName} created successfully! 🎉`);
    log.header('Next Steps');
    log.normal(`  cd ${projectName}`);
    
    if (options.skipInstall) {
      log.normal('  npm install');
    }
    
    log.normal('  npm run dev');
    log.normal(`  Open http://localhost:${port || 3000}`);
    
    processManager.gracefulShutdown(null, 0);
    
  } catch (error) {
    log.error('Project creation failed');
    processManager.handleFatalError(error, 'createProject');
  }
}

async function checkDir(dirName, skipCheck) {
  if (skipCheck) return false;
  return fs.pathExists(dirName);
}

async function createDirsJs(rootDir) {
  process.chdir(rootDir);
  
  const folders = [
    'src',
    'src/controllers',
    'src/models', 
    'src/routes',
    'src/middlewares',
    'src/utils',
    'src/configs'
  ];
  
  for (const folder of folders) {
    await fs.ensureDir(folder);
  }
}

async function createFilesJs() {
  await fs.ensureFile('app.js');
  await fs.ensureFile('src/controllers/main.controller.js');
  await fs.ensureFile('src/routes/main.route.js');
}

async function writeToFilesJs(rootDir, port) {
  await fs.outputFile(path.join(rootDir, 'app.js'), appFileContent(port));
  await fs.outputFile(path.join(rootDir, 'src/routes/main.route.js'), routeFileContent());
  await fs.outputFile(path.join(rootDir, 'src/controllers/main.controller.js'), controllerFileContent());
}

async function initPackageManager(packageManager = 'npm') {
  await runCommand(packageManager, ['init', '-y']);
}

async function installPackages(packageManager = 'npm', extraPackages = []) {
  const defaultPackages = ['express', 'cors', 'helmet', 'dotenv', 'nodemon'];
  const packages = [...defaultPackages, ...extraPackages];
  
  log.info(`Installing ${packages.length} packages...`);
  await runCommand(packageManager, ['install', ...packages]);
}

module.exports = createProject;