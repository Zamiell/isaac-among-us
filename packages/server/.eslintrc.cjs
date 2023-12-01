const path = require("node:path");

// This is the configuration file for ESLint, the TypeScript linter:
// https://eslint.org/docs/user-guide/configuring
module.exports = {
  extends: [
    // The linter base is the shared IsaacScript config:
    // https://github.com/IsaacScript/eslint-config-isaacscript/blob/main/base.js
    "eslint-config-isaacscript/base",
  ],

  parserOptions: {
    // ESLint needs to know about the project's TypeScript settings in order for TypeScript-specific
    // things to lint correctly. We do not point this at "./tsconfig.json" because certain files
    // (such at this file) should be linted but not included in the actual project output.
    project: path.join(__dirname, "tsconfig.eslint.json"),
  },

  ignorePatterns: ["dist/"],

  rules: {
    // We need to use `null` because the field needs to be present in the JSON transfer between
    // client and server.
    "unicorn/no-null": "off",

    "no-param-reassign": "off",

    // Copy-pasted from "eslint-config-isaacscript".
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        patterns: [
          // Some "src" directories have an "index.ts" file, which means that importing from the
          // directory is valid. Thus, we check for the "src" directory with no suffix.
          {
            group: ["**/src"],
            message:
              'You cannot import from a "src" directory. If this is a monorepo, import using the package name like you would in a non-monorepo project.',
          },

          {
            group: ["**/src/**"],
            message:
              'You cannot import from a "src" directory. If this is a monorepo, import using the package name like you would in a non-monorepo project.',
          },

          // Some "dist" directories have an "index.ts" file, which means that importing from the
          // directory is valid. Thus, we check for the "dist" directory with no suffix.
          {
            group: ["**/dist"],
            message:
              'You cannot import from a "dist" directory. If this is a monorepo, import using the package name like you would in a non-monorepo project.',
          },

          {
            group: ["**/dist/**"],
            message:
              'You cannot import from a "dist" directory. If this is a monorepo, import using the package name like you would in a non-monorepo project.',
          },

          {
            group: ["**/index"],
            message:
              "You cannot import from a package index. Instead, import directly from the file where the code is located.",
          },

          {
            group: ["**/index.{js,cjs,mjs,ts,cts,mts}"],
            message:
              "You cannot import from a package index. Instead, import directly from the file where the code is located.",
          },

          // Added for this project.
          {
            group: ["isaacscript-common"],
            message:
              "You cannot import from Lua packages on the TypeScript server.",
          },
        ],
      },
    ],
  },
};
