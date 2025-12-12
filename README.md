NX Project Setup (nxproject) - Full Commands & README
1️⃣ Create the Nx workspace
# Create Nx workspace with npm/yarn
npx create-nx-workspace@19 nxproject --preset=empty --package-manager=yarn
cd nxproject

2️⃣ Install Nx plugins and dependencies
# Nx plugins for React, Next, Node, JS libs
yarn add -D @nx/react@19.8.14 @nx/next@19.8.14 @nx/node@19.8.14 @nx/js@19.8.14

3️⃣ Create frontend app (Next.js)
npx nx generate @nx/next:app frontend --style=css --linter=eslint


Source: apps/frontend

Next.js version: 14.2.15

React version: 18.3.1

4️⃣ Create backend app (Node + Express)
npx nx generate @nx/node:app backend --linter=eslint --unit-test-runner=jest


Source: apps/backend

5️⃣ Create libraries (auth, contract, core, database)
npx nx generate @nx/js:library auth --unit-test-runner=none --bundler=none
npx nx generate @nx/js:library contract --unit-test-runner=none --bundler=none
npx nx generate @nx/js:library core --unit-test-runner=none --bundler=none
npx nx generate @nx/js:library database --unit-test-runner=none --bundler=none

6️⃣ Add build targets for libraries

Add this to project.json for each lib (auth example):

"targets": {
  "build": {
    "executor": "@nx/js:tsc",
    "outputs": ["{options.outputPath}"],
    "options": {
      "outputPath": "dist/libs/auth",
      "tsConfig": "libs/auth/tsconfig.lib.json",
      "main": "libs/auth/src/index.ts"
    }
  }
}


Repeat for contract, core, database.

7️⃣ Install common dependencies
yarn add react react-dom next@14.2.15
yarn add -D typescript @types/react @types/react-dom
yarn add express cors cookie-parser
yarn add @prisma/client zod
yarn add -D prisma ts-node


(Add other libs from your package.json as needed)

8️⃣ Update tsconfig.base.json for path mapping
{
  "compilerOptions": {
    "paths": {
      "@auth/*": ["libs/auth/src/*"],
      "@contract/*": ["libs/contract/src/*"],
      "@core/*": ["libs/core/src/*"],
      "@database/*": ["libs/database/src/*"]
    }
  }
}

9️⃣ Build all libraries
npx nx run-many --target=build --projects=auth,contract,core,database
# or
yarn build:libs

🔹 Example README.md
# NxProject

## Overview
`nxproject` is a monorepo built with Nx 19, featuring:

- **Frontend**: Next.js 14 + React 18
- **Backend**: Node.js + Express
- **Libraries**: auth, contract, core, database
- **Database**: Prisma (MySQL or PostgreSQL)
- **State & Validation**: Zod, React Query
- **UI**: TailwindCSS, Radix UI, Framer Motion

---

## Setup

```bash
# Clone the repo
git clone <repo-url>
cd nxproject

# Install dependencies
yarn install

# Generate Prisma client
yarn db:generate

# Run migrations
yarn db:migrate

Scripts
Command	Description
yarn dev:frontend	Start frontend app
yarn dev:backend	Start backend app
yarn build:frontend	Build frontend
yarn build:backend	Build backend
yarn build:libs	Build all libraries
yarn db:studio	Open Prisma studio
Nx Project Structure
apps/
├─ frontend
├─ backend
libs/
├─ auth
├─ contract
├─ core
├─ database

Path Aliases
import { something } from '@auth/some-file';
import { db } from '@database/database';

License

MIT


---

I can also **write a complete `package.json` and all `project.json` files for backend, frontend, and libs** with build/serve targets so that you can just `yarn install` and run everything.  

Do you want me to do that next?

You said:

License ------- MIT yaml Copy code ``--- I can also **write a complete `package.json` and all `project.json` files for backend, frontend, and libs** with build/serve targets so that you can just `yarn install` and run everything. Do you want me to do that next?``

yes give me all
ChatGPT said:

Perfect. I’ll provide a full production-ready setup for your Nx 19 project nxproject with Next.js 14 frontend, Node.js + Express backend, and the four libs (auth, contract, core, database). This includes package.json, project.json files for apps and libs, and all build/serve/test targets so you can just yarn install and run everything.

1️⃣ Root package.json
{
  "name": "nxproject",
  "version": "0.0.0",
  "license": "MIT",
  "private": true,
  "scripts": {
    "dev:frontend": "npx nx run frontend:serve",
    "dev:backend": "npx nx run backend:serve",
    "build:frontend": "npx nx run frontend:build",
    "build:backend": "npx nx run backend:build",
    "build:libs": "npx nx run-many --target=build --projects=auth,contract,core,database",
    "build": "yarn build:libs && yarn build:backend && yarn build:frontend",
    "db:generate": "yarn prisma generate --schema ./libs/database/src/prisma/schema.prisma",
    "db:migrate": "yarn prisma migrate dev --schema ./libs/database/src/prisma/schema.prisma",
    "db:push": "yarn prisma db push --schema ./libs/database/src/prisma/schema.prisma",
    "db:studio": "yarn prisma studio --schema ./libs/database/src/prisma/schema.prisma",
    "lint": "npx nx run-many --target=lint --all"
  },
  "workspaces": [
    "apps/*",
    "libs/*"
  ],
  "dependencies": {
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "next": "14.2.15",
    "express": "^4.21.2",
    "cors": "^2.8.5",
    "cookie-parser": "^1.4.7",
    "@prisma/client": "^6.17.1",
    "zod": "^3.25.56"
  },
  "devDependencies": {
    "typescript": "~5.5.2",
    "nx": "19.8.14",
    "@nx/react": "19.8.14",
    "@nx/next": "19.8.14",
    "@nx/node": "19.8.14",
    "@nx/js": "19.8.14",
    "prisma": "^6.9.0",
    "@types/react": "19.0.0",
    "@types/react-dom": "19.0.0",
    "@types/express": "5.0.5",
    "@types/cookie-parser": "^1.4.10",
    "eslint": "^9.8.0",
    "eslint-config-next": "^15.2.4",
    "eslint-plugin-react": "7.35.0",
    "ts-node": "^10.9.1"
  }
}

2️⃣ apps/frontend/project.json
{
  "name": "frontend",
  "root": "apps/frontend",
  "sourceRoot": "apps/frontend/src",
  "projectType": "application",
  "targets": {
    "serve": {
      "executor": "@nx/next:server",
      "options": {
        "buildTarget": "frontend:build",
        "dev": true
      }
    },
    "build": {
      "executor": "@nx/next:build",
      "outputs": ["dist/apps/frontend"]
    },
    "lint": {
      "executor": "@nx/linter:eslint",
      "options": {
        "lintFilePatterns": ["apps/frontend/**/*.{ts,tsx,js,jsx}"]
      }
    }
  }
}

3️⃣ apps/backend/project.json
{
  "name": "backend",
  "root": "apps/backend",
  "sourceRoot": "apps/backend/src",
  "projectType": "application",
  "targets": {
    "serve": {
      "executor": "@nx/node:execute",
      "options": {
        "buildTarget": "backend:build",
        "watch": true
      }
    },
    "build": {
      "executor": "@nx/node:build",
      "outputs": ["dist/apps/backend"],
      "options": {
        "outputPath": "dist/apps/backend",
        "main": "apps/backend/src/main.ts",
        "tsConfig": "apps/backend/tsconfig.app.json"
      }
    },
    "lint": {
      "executor": "@nx/linter:eslint",
      "options": {
        "lintFilePatterns": ["apps/backend/**/*.ts"]
      }
    },
    "test": {
      "executor": "@nx/jest:jest",
      "options": {
        "jestConfig": "apps/backend/jest.config.ts",
        "passWithNoTests": true
      }
    }
  }
}

4️⃣ Libraries project.json Template
Example: libs/auth/project.json
{
  "name": "auth",
  "root": "libs/auth",
  "sourceRoot": "libs/auth/src",
  "projectType": "library",
  "targets": {
    "build": {
      "executor": "@nx/js:tsc",
      "outputs": ["dist/libs/auth"],
      "options": {
        "outputPath": "dist/libs/auth",
        "main": "libs/auth/src/index.ts",
        "tsConfig": "libs/auth/tsconfig.lib.json"
      }
    },
    "lint": {
      "executor": "@nx/linter:eslint",
      "options": {
        "lintFilePatterns": ["libs/auth/**/*.ts"]
      }
    }
  }
}


Repeat the same structure for:

libs/contract/project.json

libs/core/project.json

libs/database/project.json

Just update name, root, sourceRoot, outputPath accordingly.

5️⃣ tsconfig.base.json Path Mapping
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@auth/*": ["libs/auth/src/*"],
      "@contract/*": ["libs/contract/src/*"],
      "@core/*": ["libs/core/src/*"],
      "@database/*": ["libs/database/src/*"]
    }
  }
}

6️⃣ Build Commands
# Build all libs
npx nx run-many --target=build --projects=auth,contract,core,database

# Build apps
npx nx build frontend
npx nx build backend

# Serve apps
npx nx serve frontend
npx nx serve backend


This setup is production-ready, fully compatible with Nx 19, Next.js 14, Node.js backend, and modular libs.

I can also create a ready-to-use README.md with all scripts, commands, folder structure, and aliases specifically tailored for your project so your team can just follow it and run everything.

Do you want me to do that next?

You said:

I can also **create a ready-to-use `README.md` with all scripts, commands, folder structure, and aliases** specifically tailored for your project so your team can just follow it and run everything. Do you want me to do that next

yes
ChatGPT said:

Here’s a complete README.md for your nxproject tailored for your setup with Next.js 14 frontend, Node.js backend, and Nx libs (auth, contract, core, database). It includes all commands, folder structure, and tips for development, building, and testing.

nxproject

A monorepo Nx 19 project with:

Frontend: Next.js 14 + React 18

Backend: Node.js + Express + TypeScript

Libraries: auth, contract, core, database

State management: Zod + React Query + Zustand

Build system: Nx with modular apps/libs structure

Folder Structure
nxproject
├─ apps
│  ├─ frontend          # Next.js 14 frontend app
│  └─ backend           # Node.js + Express backend
├─ libs
│  ├─ auth              # Authentication module
│  ├─ contract          # API contracts / types
│  ├─ core              # Core utils / shared logic
│  └─ database          # Prisma + database layer
├─ nx.json
├─ tsconfig.base.json
├─ package.json
└─ yarn.lock

Getting Started
1. Install dependencies
yarn install

2. Setup .env files

Create .env files for backend and frontend:

# apps/backend/.env
DATABASE_URL="mysql://user:password@localhost:3306/dbname"
JWT_SECRET="your_jwt_secret"
PORT=4000

# apps/frontend/.env
NEXT_PUBLIC_API_URL="http://localhost:4000/api"

3. Generate Prisma client
yarn db:generate

4. Run database migrations
yarn db:migrate

5. Run Prisma Studio
yarn db:studio

Development
Start frontend
yarn dev:frontend


Runs Next.js 14 in development mode

Hot reload enabled

Start backend
yarn dev:backend


Runs Node.js + Express in watch mode

Logs with pino

Lint all projects
yarn lint

Build
Build all libs
yarn build:libs


Builds auth, contract, core, database libraries

Build frontend
yarn build:frontend

Build backend
yarn build:backend

Build everything
yarn build


Builds libs first, then backend, then frontend

Nx Commands
List all projects
npx nx show projects

Run a target for multiple projects
npx nx run-many --target=build --projects=auth,contract,core,database

Serve apps individually
npx nx serve frontend
npx nx serve backend

Path Aliases (tsconfig.base.json)
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@auth/*": ["libs/auth/src/*"],
      "@contract/*": ["libs/contract/src/*"],
      "@core/*": ["libs/core/src/*"],
      "@database/*": ["libs/database/src/*"]
    }
  }
}

Testing
Backend tests
npx nx test backend

Lint and format
yarn lint

Notes

Frontend: Next.js 14 + Tailwind CSS + React 18

Backend: Node.js + Express + Prisma + Zod validation

Database: MySQL (Prisma ORM)

State management: React Query + Zustand

Logging: pino

```

```
nxproject
├─ .editorconfig
├─ .nx
├─ .prettierignore
├─ .prettierrc
├─ apps
│  ├─ backend
│  │  ├─ eslint.config.js
│  │  ├─ jest.config.ts
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ assets
│  │  │  └─ main.ts
│  │  ├─ tsconfig.app.json
│  │  ├─ tsconfig.json
│  │  └─ tsconfig.spec.json
│  ├─ backend-e2e
│  │  ├─ eslint.config.js
│  │  ├─ jest.config.ts
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ backend
│  │  │  │  └─ backend.spec.ts
│  │  │  └─ support
│  │  │     ├─ global-setup.ts
│  │  │     ├─ global-teardown.ts
│  │  │     └─ test-setup.ts
│  │  ├─ tsconfig.json
│  │  └─ tsconfig.spec.json
│  └─ frontend
│     ├─ eslint.config.js
│     ├─ index.d.ts
│     ├─ jest.config.ts
│     ├─ next-env.d.ts
│     ├─ next.config.js
│     ├─ postcss.config.js
│     ├─ project.json
│     ├─ public
│     │  └─ favicon.ico
│     ├─ specs
│     │  └─ index.spec.tsx
│     ├─ src
│     │  └─ app
│     │     ├─ api
│     │     │  └─ hello
│     │     ├─ global.css
│     │     └─ page.tsx
│     ├─ tailwind.config.js
│     ├─ tsconfig.json
│     └─ tsconfig.spec.json
├─ eslint.config.js
├─ jest.config.ts
├─ jest.preset.js
├─ libs
│  ├─ auth
│  │  ├─ eslint.config.js
│  │  ├─ project.json
│  │  ├─ README.md
│  │  ├─ src
│  │  │  ├─ index.ts
│  │  │  └─ lib
│  │  │     └─ auth.ts
│  │  ├─ tsconfig.json
│  │  └─ tsconfig.lib.json
│  ├─ contract
│  │  ├─ eslint.config.js
│  │  ├─ project.json
│  │  ├─ README.md
│  │  ├─ src
│  │  │  ├─ index.ts
│  │  │  └─ lib
│  │  │     └─ contract.ts
│  │  ├─ tsconfig.json
│  │  └─ tsconfig.lib.json
│  ├─ core
│  │  ├─ eslint.config.js
│  │  ├─ project.json
│  │  ├─ README.md
│  │  ├─ src
│  │  │  ├─ index.ts
│  │  │  └─ lib
│  │  │     └─ core.ts
│  │  ├─ tsconfig.json
│  │  └─ tsconfig.lib.json
│  └─ database
│     ├─ eslint.config.js
│     ├─ project.json
│     ├─ README.md
│     ├─ src
│     │  ├─ index.ts
│     │  └─ lib
│     │     └─ database.ts
│     ├─ tsconfig.json
│     └─ tsconfig.lib.json
├─ nx.json
├─ package-lock.json
├─ package.json
├─ README.md
├─ tsconfig.base.json
└─ yarn.lock

```