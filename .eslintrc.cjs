module.exports = {
  plugins: ['sonarjs'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:sonarjs/recommended',
    'prettier',
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'prefer-arrow-callback': 'off',
    'class-methods-use-this': 'off',
    'semi': 'off',
    '@typescript-eslint/semi': 'error',
    'import/no-cycle': [2],
    'quotes': [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': ['error'],
    '@typescript-eslint/no-floating-promises': ['error'],
    'sonarjs/no-duplicate-string': ['error', 5],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.ts',
          '**/*.test.tsx',
          '**/__tests__/__helpers__/**/*.*',
          'jest.setup.after-env.ts',
        ],
      },
    ],
    'no-restricted-imports': ['error'],
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'no-nested-ternary': 'off',
  },
  overrides: [
    {
      files: ['*.test.*'],
      rules: {
        'sonarjs/no-identical-functions': 'off',
      },
    },
  ],
};
