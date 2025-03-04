module.exports = {
  overrides: [
    {
      files: ["*.js"],
      ignoredPatterns: ["node_modules"],
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
  ]
};

