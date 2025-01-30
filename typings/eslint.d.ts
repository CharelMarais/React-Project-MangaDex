declare module "*.eslintrc.js" {
    import { Linter } from "eslint";
    const value: Linter.Config;
    export default value;
  }