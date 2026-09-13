import { defineConfig } from "i18next-cli";

export default defineConfig({
  locales: ["en", "de", "it", "tr"],
  extract: {
    input: "src/**/*{ts,tsx}",
    output: "locales/{{language}}/{{namespace}}.json",
    defaultNS: "translation",
    keySeparator: false,
    nsSeparator: false,
    functions: ["t", "*.t"],
    transComponents: ["Trans"],
  },
  types: {
    input: ["locales/{{language}}/{{namespace}}.json"],
    output: "src/types/i18next.d.ts",
  },
});
