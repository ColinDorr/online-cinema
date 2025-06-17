// tests/setup.ts
// Optionele globale setup voor Vitest

import "dotenv/config"; // Load .env variables into process.env automatically
import "@testing-library/jest-dom"; // Optional jest-dom matchers

import { vi } from "vitest";
// Global fetch mock for all tests
global.fetch = vi.fn();
