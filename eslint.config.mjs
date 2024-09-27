import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier"; // Import Prettier config

export default [
  {
    files: ["**/*.ts"], // Apply to TypeScript files
    ignores: ["node_modules/", "dist/"], // Ignore node_modules and dist directories

    // Language options and globals
    languageOptions: {
      ecmaVersion: "latest", // Use the latest ECMAScript version
      sourceType: "module", // Set the source type to module
      parser: typescriptParser, // Use TypeScript parser
      globals: {
        process: "readonly", // Define 'process' as a readonly global
      },
    },

    // Define plugins
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },

    // ESLint rules
    rules: {
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-console": "warn",
      "no-undef": "error",
    },
  },

  // Manually include Prettier configuration instead of using 'extends'
  prettierConfig,
];