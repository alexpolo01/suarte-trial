module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [ /** Extends is used to import several rules that are already defined instead of adding them into "rules" section one by one */
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: { 
    ecmaVersion: 'latest', 
    sourceType: 'module', 
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react']
    },
  },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', "simple-import-sort"],
  rules: {
    "indent": ["error", 2],
    "semi": ["error", "always"],
    "spaced-comment": "error",
    "object-curly-spacing": ["error", "always"],
    "key-spacing": ["error", { "beforeColon": false }],
    "space-before-blocks": ["error", "always"],
    "no-var": "error",
    'react-refresh/only-export-components': 'warn',
    "react/prop-types": "off", 
    "react/no-unescaped-entities": "off", /** Remove on new projects */
    "react-hooks/exhaustive-deps": "off", /** Not a great practice to have this disabled. But i'll leave it for now. */
    "tailwindcss/no-custom-classname": "off", /** We want to have the best of both worlds. Tailwind's utility classes and our custom utility classes */
    "no-multiple-empty-lines": [
      "error", {
        "max": 1,
        "maxEOF": 0,
        "maxBOF": 0
      }
    ],
  }
};