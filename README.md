# React Base Setup

## Project Description

`react-base-setup` is a starter project for building scalable React applications with a feature-based structure.

The template is designed to provide a practical foundation for projects that need:

- React with TypeScript
- Vite for local development and builds
- Redux Toolkit for state management
- React Router for routing
- Shared UI components and reusable hooks
- Storybook for component development
- Vitest and Cypress for testing

This project is best used as a base architecture for internal products, dashboards, admin panels, or any React application that benefits from a modular feature-first code organization.

## Installation Instructions

### Prerequisites

- Node.js 20 or newer is recommended
- npm installed locally

### Install Dependencies

```bash
npm install
```

### Start The Development Server

```bash
npm run dev
```

### Build For Production

```bash
npm run build
```

### Run Linting

```bash
npm run lint
```

### Run Tests

```bash
npm run test
```

### Open Storybook

```bash
npm run storybook
```

### Open Cypress

```bash
npm run cy:open
```

## Project Infrastructure

The project follows a feature-first structure with shared infrastructure separated from product-specific features.

### Root Files

- `package.json`: project scripts, runtime dependencies, and developer tooling
- `vite.config.ts`: Vite configuration for development and build behavior
- `cypress.config.ts`: Cypress end-to-end test configuration
- `eslint.config.js`: linting rules and code quality setup
- `tsconfig*.json`: TypeScript configuration for app, node, and workspace usage
- `vitest.browser.config.ts`: browser-oriented test configuration

### Main Source Structure

- `src/main.tsx`: application entry point
- `src/app/`: app-level bootstrapping, top-level styles, and global app state setup
- `src/routes/`: route definitions and navigation flow
- `src/store/`: Redux store configuration, root reducer, hooks, and slice injection helpers
- `src/services/`: HTTP clients, storage helpers, and service type definitions
- `src/shared/`: reusable components, hooks, layout pieces, themes, and shared types
- `src/features/`: business features grouped by domain such as home, product list, inventory list, and examples
- `src/utils/`: reusable helpers and code generation utilities
- `src/language/`: localization resources
- `src/stories/`: Storybook stories and component showcase content
- `src/test/`: shared test setup utilities
- `src/assets/`: static assets used by the application

### Feature Folder Purpose

Each folder inside `src/features/` is intended to contain everything related to one business capability. A feature can include:

- page or screen components
- local Redux slice logic
- API hooks or async thunk logic
- feature-specific constants, mock data, and types
- smaller internal UI parts used only by that feature

This approach helps keep feature logic together and reduces coupling between unrelated parts of the app.

### Shared Layer Purpose

The `src/shared/` folder contains code that should be reusable across multiple features. This includes:

- UI components such as modal, button, accordion, dropdown, and tabs
- shared hooks for browser behavior, state helpers, performance helpers, and UI logic
- layouts such as top menu, footer, and side menu
- theme wrappers and shared types

Use `shared` for generic building blocks. Use `features` for business-specific behavior.

## Usage

This project is best suited for teams that want a reusable React starter with an opinionated but flexible structure.

Recommended use cases:

- starting a new React + TypeScript application
- building dashboard or portal-style products
- creating apps that require shared UI primitives and feature isolation
- prototyping products that may later grow into larger codebases
- standardizing frontend architecture across multiple internal projects

Suggested workflow:

1. Create a new feature folder inside `src/features/` for each business area.
2. Add reusable UI only when it is needed by multiple features, and place it in `src/shared/`.
3. Keep service logic in `src/services/` and state wiring in `src/store/`.
4. Use Storybook for isolated UI development and Vitest or Cypress for validation.

## Contribution Guidelines

Contributions should keep the codebase modular, readable, and consistent with the existing structure.

### Before Contributing

1. Install dependencies with `npm install`.
2. Run the app locally with `npm run dev`.
3. Check formatting and quality with `npm run lint`.
4. Run relevant tests before submitting changes.

### Contribution Rules

1. Keep business logic inside the relevant feature folder.
2. Move code into `src/shared/` only when it is truly reusable.
3. Prefer small, focused pull requests.
4. Avoid mixing refactors with unrelated feature work.
5. Update this README if the project structure or workflow changes.

### Recommended Pull Request Checklist

- clear summary of the change
- screenshots or Storybook updates for UI changes
- test coverage or explanation when tests are not added
- notes about any architectural decision that affects other contributors

## Suggested Next Customization

This README is a strong base template. Before using it in production, consider updating:

- the project description with your exact product goal
- environment variable setup instructions if required
- deployment instructions for your target environment
- branch naming, review, and release rules specific to your team
