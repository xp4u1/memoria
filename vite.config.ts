import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), legacy(), nodePolyfills()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
