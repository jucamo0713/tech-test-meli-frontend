import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import {globalIgnores} from 'eslint/config'
import jsdoc from 'eslint-plugin-jsdoc';
import tsSortKeys from 'eslint-plugin-typescript-sort-keys';

export default tseslint.config([
    {
        files: ['src/**/*.{ts,tsx}', '*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: {...globals.browser, ...globals.jest},
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        files: ['tests/**/*.ts', 'tests/**/*.tsx'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: {...globals.browser, ...globals.jest},
            parserOptions: {
                project: './tsconfig.test.json',
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    globalIgnores(['dist']),
    js.configs.recommended,
    ...tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
    reactHooks.configs['recommended-latest'],
    reactRefresh.configs.vite,
    {
        rules: {
            'linebreak-style': ['error', 'unix'],
            'max-depth': ['error', 4],
            'object-curly-spacing': ['error', 'always'],
            'prefer-arrow-callback': ['error', { allowUnboundThis: false }],
            'prefer-template': ['error'],
            quotes: ['error', 'single', { avoidEscape: true }],
            semi: ['error', 'always'],
            'sort-keys': ['error', 'asc'],
            'sort-vars': ['error'],
        },
    },
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-unsafe-argument': 'error',
        },
    },

    ...(Array.isArray(jsdoc.configs['flat/recommended-typescript-error'])
        ? jsdoc.configs['flat/recommended-typescript-error']
        : [jsdoc.configs['flat/recommended-typescript-error']]),
    {
        plugins: {
            jsdoc,
        },
        rules: {
            'jsdoc/require-description': [
                'error',
                {
                    checkConstructors: false,
                    contexts: ['any'],
                },
            ],
            'jsdoc/require-jsdoc': [
                'error',
                {
                    checkGetters: false,
                    checkSetters: false,
                    require: {
                        ArrowFunctionExpression: false,
                        ClassDeclaration: true,
                        ClassExpression: true,
                        FunctionDeclaration: true,
                        FunctionExpression: true,
                        MethodDefinition: true,
                    },
                },
            ],
            'jsdoc/require-throws': [
                'error',
                {
                    contexts: [
                        'ArrowFunctionExpression',
                        'ClassDeclaration',
                        'ClassExpression',
                        'FunctionDeclaration',
                        'FunctionExpression',
                        'MethodDefinition',
                    ],
                },
            ],
        },
    },
    {
        plugins: {
            tsSortKeys,
        },
        rules: {
            'tsSortKeys/interface': [
                'error',
                'asc',
                {
                    requiredFirst: true,
                },
            ],
            'tsSortKeys/string-enum': ['error'],
        },
    }
])
