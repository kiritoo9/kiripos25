# Backend Service

## Overview
This is the backend service for the POS system, built using **Node.js** and managed with **Bun** for package management.

## Prerequisites
- **Node.js** (latest LTS recommended)
- **Bun** (installed globally)
- **Lerna** (for monorepo management)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/kiritoo9/kiripos25.git
   cd packages/backend
   ```

2. Install dependencies using Bun:
   ```sh
   bun install
   ```

## Environment Variables
Create a `.env.development` or `.env.production` file in the project root and configure the necessary environment variables based on `.env.example`.

## Running the Service
Migrating and seeding database:
```sh
bun run migrate
```
To start the backend service, run:
```sh
bun run serve
```

## API Documentation
API documentation is available via Swagger. Start the server and visit:
```
http://localhost:5000/docs
```

## License
This project is licensed under the **MIT License**.

## Version
0.0.1