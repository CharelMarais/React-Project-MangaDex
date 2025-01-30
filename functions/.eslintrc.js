module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: 'tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  ignorePatterns: [
    "/lib/**/*",
    ".eslintrc.js"
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
   "quotes": ["error", "double"],
    "indent": ["error", 2],
    "object-curly-spacing": ["error", "always"],
    "max-len": ["error", { "code": 120 }],
    "require-jsdoc": "off",
    "valid-jsdoc": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "no-unused-vars": "warn"
  },
};
