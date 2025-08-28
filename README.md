# Web Template

This repository contains a web template built primarily using TypeScript.

 run-build
This project uses [pnpm](https://pnpm.io/) as the package manager. If you don't have pnpm installed, you can install it globally:

```bash
npm install -g pnpm
# or
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
# or alternatively:
npm run dev
# or
yarn dev
# or
bun dev
```

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project is a web template designed to help developers quickly start their web applications. It includes a set of tools and configurations to streamline the development process.

## Features

- Written in TypeScript
- Modular design
- Easy to customize
- Pre-configured with essential tools


## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/maulana-tech/web-template.git
   ```
2. Navigate to the project directory:
   ```bash
   cd web-template
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```


## Available Scripts

Here are the available pnpm scripts for this project:

```bash
# Development
pnpm dev              # Start development server with Turbopack
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues automatically
pnpm format           # Format code with Prettier
pnpm format:check     # Check code formatting
pnpm type-check       # Run TypeScript type checking

# Analysis
pnpm analyze          # Analyze bundle size
pnpm analyze:serve    # Analyze and serve bundle report
```

## Learn More
## Usage

To start the development server, run:
```bash
npm start
```

To build the project for production, run:
```bash
npm run build
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

Feel free to customize this template further according to your project's specific needs!
