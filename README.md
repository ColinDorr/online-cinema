# Nuxt - Online Cinema

## Project Overview

This application is an online cinema platform built with Nuxt. It provides users with a seamless streaming experience, integrating with [TheTVDB v4 API](https://github.com/thetvdb/v4-api?tab=readme-ov-file) to fetch and display TV show data. The app is designed to deliver rich content while maintaining efficient state management and analytics tracking.

## Requirements

- Node.js version: v22.x

## Integration

The app integrates with [TheTVDB v4 API](https://github.com/thetvdb/v4-api?tab=readme-ov-file) to access up-to-date TV show metadata and images, enabling dynamic content presentation.

## Key Features

- Custom datalayer events for analytics to **track user interactions** and streaming behavior.
- **Pinia state management** with clearly separated user and streaming data stores for organized and scalable state handling.
- **Unit tests covering** utility functions and API calls to ensure reliability and maintainability.
- **Infinite scroll loading** implementation for the overview pages `/movies`, `/series`, and `/people`.
- **A/B testing** setup that automatically integrates the assigned test version into custom datalayer events.
- The ability to use the A/B testing version to **conditionally render** different content in the app, for example altering elements on the `/profile` page based on the active test version.

## Scripts & Commands

The following npm scripts are commonly available in this project. Please note that the availability of these scripts depends on the configuration in your `package.json` file. Be sure to check there for all scripts and details.

- `npm install`: Installs project dependencies.
- `npm run dev`: Starts a development server at `http://localhost:3000` with hot module replacement.
- `npm run build`: Builds the application for production, generating optimized client and server bundles.
- `npm run preview`: Runs a local preview server to test the production build.
- `npm run lint`: Lints the codebase for formatting and syntax issues (if present in `package.json` scripts).
- `npm run test`: Executes unit tests to validate code functionality (if present).

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
