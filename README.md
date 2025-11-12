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
git clone https://github.com/Dannys-notepad/zorx.git
cd zorx
pnpm install
pnpm link  # Makes zorx available globally
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
    ├── routes/
    │   └── main.route.js
    ├── models/
    ├── middlewares/
    ├── utils/
    └── configs/
```

Command Options

```bash
zorx create <project-name> [options]
```

Option Description Default
--force Override and recreate directory if exists false
--port <port> Specify custom server port 3000
--skip-install Skip dependency installation false
--install <packages> Extra packages (comma separated) []
--package-manager <pm> Specify package manager npm

Examples

Basic project creation:

```bash
zorx create my-api
```

With custom port:

```bash
zorx create my-api --port 8080
```

Force recreate existing directory:

```bash
zorx create my-api --force
```

Skip installation and use specific package manager:

```bash
zorx create my-api --skip-install --package-manager pnpm
```

Install additional packages:

```bash
zorx create my-api --install "cors,helmet,morgan"
```

Coming Soon Features

· --ts - TypeScript template support
· --template - Multiple project templates
· --git - Automatic git repository initialization

Key Features

· Express.js Setup - Pre-configured with proper middleware and structure
· MVC Architecture - Organized folder structure for scalability
· Production Ready - Includes error handling and security best practices
· Multi-Package Manager - Supports npm, yarn, pnpm, and bun
· Customizable - Easy to extend and modify generated projects

Generated Project Includes

app.js

· Express server with CORS and Helmet security
· Configurable port with environment variable support
· Route integration and middleware setup

package.json

· Basic npm scripts (start, dev)
· Pre-configured dependencies (Express, CORS, Helmet, etc.)
· CommonJS module system

Sample API Structure

· Controllers with error handling
· Route definitions
· RESTful response structure

Quick Start

1. Create your project:
   ```bash
   zorx create my-app
   ```
2. Navigate to project:
   ```bash
   cd my-app
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Test your API:
   ```bash
   curl http://localhost:3000
   ```
   Response: {"res": "Your API is up and running 🚀"}

Requirements

· Node.js 16.0.0 or higher
· npm, yarn, pnpm, or bun package manager
· Internet connection (for dependency installation)

Troubleshooting

Directory already exists:

```bash
zorx create my-project --force
```

Permission errors (Unix systems):

```bash
sudo npm install -g zorx-cli
```

Installation fails:

· Check internet connection
· Verify Node.js version: node --version
· Try with --skip-install and install dependencies manually

Support

· GitHub: https://github.com/Dannys-notepad/zorx
· Issues: https://github.com/Dannys-notepad/zorx/issues

Contributing

1. Fork the repository
2. Create a feature branch: git checkout -b feature/amazing-feature
3. Commit your changes: git commit -m 'Add amazing feature'
4. Push to the branch: git push origin feature/amazing-feature
5. Open a Pull Request

License

MIT © Etim Daniel Udeme (@Dannysnotepad)

---

Get started in seconds: npm install -g zorx-cli && zorx create my-project