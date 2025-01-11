import pluginJs from "@eslint/js";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs", globals: globals.node },
    rules: {
		"quotes": ["error", "single", { "allowTemplateLiterals": true }],
		indent: ["error", 4],
		semi: ["error", "always"],
		"no-promise-executor-return": ["error"],
		"arrow-parens": ["error", "always"],
		"object-curly-spacing": ["error", "always"],
		"object-curly-newline": ["error", {
			"ObjectExpression": { "multiline": true, "minProperties": 1 },
			"ObjectPattern": { "multiline": true },
			"ImportDeclaration": { "multiline": true },
			"ExportDeclaration": { "multiline": true }
		}],
		"object-property-newline": ["error", { "allowAllPropertiesOnSameLine": false }],
		"array-bracket-newline": ["error", "always"],
		"array-element-newline": ["error", { "multiline": true, "minItems": 1 }],
		"keyword-spacing": ["error", { "before": true, "after": true }],
		"non-used-vars": ["error", { "argsIgnorePattern": "next"}],
    },
  },
  pluginJs.configs.recommended,
];
