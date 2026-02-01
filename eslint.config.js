import eslintReact from "@eslint-react/eslint-plugin";
import { includeIgnoreFile } from "@eslint/compat";
import { defineConfig } from "eslint/config";
import eslintJs from "@eslint/js";
import tseslint from "typescript-eslint";
import path from "node:path";

const gitignorePath = path.resolve(import.meta.dirname, ".gitignore");

export default defineConfig([
  includeIgnoreFile(gitignorePath),
  {
    ignores: ["android/*", "ios/*"],
  },
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],

    extends: [
      eslintJs.configs.recommended,
      tseslint.configs.recommended,
      eslintReact.configs["recommended-typescript"],
    ],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
