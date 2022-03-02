module.exports = {
    root: true,
    ignorePatterns: ['rollup.config.js', 'dist/**/*', 'tests/type-tests/**/*'],
    overrides: [
        {
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint', 'jest'],
            env: {
                'jest/globals': true,
            },
            files: ['*.ts'],
            parserOptions: {
                project: ['tsconfig.json'],
                createDefaultProgram: true,
            },
            extends: [
                'eslint:recommended',
                'plugin:jest/recommended',
                'plugin:jest/style',
                'plugin:@typescript-eslint/recommended',
                'prettier',
            ],
            settings: {
                jest: {
                    version: require('jest/package.json').version,
                },
            },
        },
    ],
    rules: {
        'no-console': 'error',
    },
};
