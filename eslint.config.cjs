module.exports = [
  {
    ignores: ["node_modules"], // Ignore node_modules
    languageOptions: {
      ecmaVersion: "latest", // Use the latest ECMAScript version
      sourceType: "module", // Set the source type to module
      globals: { structuredClone: "readonly" }, // Add structuredClone as a global
    },
    rules: {
      "no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: false,
        },
      ],
      "no-console": "warn", // Warn for console usage
      "semi": ["error", "always"], // Enforce semicolons
      "quotes": ["error", "double"], // Enforce double quotes
    },
  },
];

