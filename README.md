# Platform

## Prettier + ESLint

Remember, you need to go one folder up, as this is Platform repo, not Acstane workspace.

### .vscode/settings.json

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

### .prettierignore

```t
*/node_modules
*/dist
*/.next
```

### eslint.config.ts

```ts
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/out/**',
      '**/.vercel/**',
      '**/.turbo/**',
      'next-env.d.ts',
      '**/*.d.ts',
    ],
  },

  js.configs.recommended,

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
        React: 'readonly',
        JSX: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      prettier: prettier,
      'unused-imports': unusedImports,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          args: 'all',
        },
      ],
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      'no-empty': 'warn',
      'no-constant-condition': 'warn',
      'no-prototype-builtins': 'warn',
      'no-undef': 'off',
    },
  },

  {
    files: ['**/*.yml', '**/*.yaml', '**/*.json'],
    rules: {},
  },
];
```

### package.json

```json
{
  "name": "Acstane",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "packageManager": "pnpm@10.17.0",
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^8.44.0",
    "@typescript-eslint/parser": "^8.44.0",
    "eslint": "^9.36.0",
    "eslint-config-next": "^15.5.3",
    "eslint-config-prettier": "^10.1.8",
    "eslint-plugin-import": "^2.32.0",
    "eslint-plugin-prettier": "^5.5.4",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-unused-imports": "^4.2.0",
    "jiti": "^2.5.1",
    "prettier": "^3.6.2"
  },
  "dependencies": {
    "@eslint/js": "^9.36.0",
    "globals": "^16.4.0"
  }
}
```
