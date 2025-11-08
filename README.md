Zorx CLI

A smart CLI tool for rapid project scaffolding and boilerplate code generation. Quickly bootstrap Express.js applications with proper structure and configuration.

Installation

Global Installation (Recommended)

```bash
npm install -g zorx-cli
```

Local Installation

```bash
npm install --save-dev zorx-cli
```

From Source

```bash
git clone <your-repo-url>
cd zorx
npm install
npm link  # Makes zorx available globally
```

Usage

Create a New Project

```bash
zorx create my-project
```

This creates a new Express.js project with the following structure:

```
my-project/
├── app.js
├── package.json
└── src/
    ├── controllers/
    │   └── main.controller.js
    └── routes/
        └── main.route.js
```

Command Options

```bash
zorx create <project-name> [options]
```

Option Description Default
--force Override and recreate directory if it exists false
--ts Use TypeScript template false
--port <port> Specify custom server port 3000
--skip-install Skip dependency installation false
--install <packages> Extra packages (comma separated) []

Examples

Basic project creation:

```bash
zorx create my-api
```

With TypeScript and custom port:

```bash
zorx create my-api --ts --port 8080
```

Force recreate existing directory:

```bash
zorx create my-api --force
```

Skip npm installation:

```bash
zorx create my-api --skip-install
```

Install additional packages:

```bash
zorx create my-api --install "cors,helmet,morgan"
```

Generated Project Structure

```
project-name/
├── app.js                 # Main application file
├── package.json          # Project configuration
└── src/
    ├── controllers/
    │   └── main.controller.js  # Business logic
    └── routes/
        └── main.route.js       # Route definitions
```

Key Features

· Express.js Setup: Pre-configured with security middleware (Helmet, CORS)
· Structured Architecture: Organized MVC-like structure
· Production Ready: Includes error handling and proper logging
· Customizable: Easy to extend and modify

Generated Files Overview

app.js

· Express server with security middleware
· Configurable port (environment variable support)
· Route integration
· Server initialization

package.json

· Basic npm scripts (start, dev)
· CommonJS module system
· Pre-configured dependencies

Route & Controller

· Sample root endpoint
· Error handling
· RESTful response structure

Development

Running the Generated Project

```bash
cd my-project
npm install  # if --skip-install was used
npm run dev  # development with watch mode
# or
npm start    # production mode
```

Testing the API

Once running, test your API:

```bash
curl http://localhost:3000
```

Response:

```json
{"res": "Your API is up and running 🚀"}
```

Requirements

· Node.js 16.0.0 or higher
· npm or yarn package manager
· Internet connection (for dependency installation)

Troubleshooting

Directory already exists:

```bash
# Use --force flag to override
zorx create my-project --force
```

Permission errors:

```bash
# On Unix systems, may need sudo for global installation
sudo npm install -g zorx-cli
```

Installation fails:

· Check internet connection
· Verify Node.js version (node --version)
· Try with --skip-install and install dependencies manually

Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

License

ISC © [Dannysnotepad]