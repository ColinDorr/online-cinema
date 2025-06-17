import { fileURLToPath } from "node:url";
import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    environment: "jsdom", // voor Vue componenten + DOM-interacties
    globals: true, // zodat je `describe`, `it`, `expect` zonder imports kunt gebruiken
    setupFiles: ["./tests/setup.ts"], // optioneel: global mocks / jest-dom hier
    include: ["tests/unit/**/*.spec.ts", "tests/unit/**/*.test.ts"],
    deps: {
      inline: ["@vue", "pinia", "@testing-library/vue"],
    },
    coverage: {
      reporter: ["text", "html"],
      exclude: ["node_modules/", "tests/"],
    },
  },
});
