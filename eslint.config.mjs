export default [
  {
    ignores: ["node_modules"], // No longer part of overrides, it goes here
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn",
      "semi": ["error", "always"],
      "quotes": ["error", "double"]
    }
  }
];

