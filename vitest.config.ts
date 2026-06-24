import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["./tests/setup.ts"],
  },
  resolve: {
    alias: {
      // Mirror the "@/..." path alias from tsconfig so tests can import app code.
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
