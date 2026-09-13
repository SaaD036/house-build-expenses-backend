import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';

export default [
    {
        ignores: ['**/node_modules/**', '**/dist/**', '**/build/**'],
    },

    /**
     * @BACKEND_RULES
     */
    {
        files: ['backend/**/*.js'],
        languageOptions: {
            sourceType: 'commonjs',
            globals: {
                ...globals.node,
            },
        },
        rules: {
            ...pluginJs.configs.recommended.rules,
            'no-unused-vars': [
                1,
                {
                    vars: 'all',
                    args: 'none',
                    caughtErrors: 'none',
                    ignoreRestSiblings: false,
                    reportUsedIgnorePattern: false,
                },
            ],
            'no-undef': 2,
            semi: 2,
            'indent-legacy': ['error', 4],
            quotes: [2, 'single'],
            'comma-dangle': [
                'error',
                {
                    arrays: 'only-multiline',
                    objects: 'always-multiline',
                },
            ],
            'no-trailing-spaces': 2,
            'block-spacing': 2,
            'eol-last': [2, 'always'],
            'max-len': ['error', { code: 100, tabWidth: 4 }],
        },
    },

    /**
     * @FRONTEND_RULES
     */
    ...tseslint.configs.recommended.map((config) => ({
        ...config,
        files: ['frontend/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    })),
    {
        files: ['frontend/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        plugins: {
            react: pluginReact,
            'react-hooks': pluginReactHooks,
            '@typescript-eslint': tseslint.plugin,
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            ...pluginJs.configs.recommended.rules,
            ...pluginReact.configs.flat.recommended.rules,
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            semi: 'error',
            indent: ['error', 4],
            quotes: [2, 'single'],
            eqeqeq: 1,
            'no-undef': 0,
            'no-unused-vars': 0,
            'jsx-a11y/alt-text': 0,
            'no-trailing-spaces': 2,
            'react/react-in-jsx-scope': 1,
            '@typescript-eslint/no-explicit-any': 0,
            '@typescript-eslint/no-unused-vars': [
                1,
                {
                    args: 'none',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'none',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
            '@typescript-eslint/no-empty-object-type': 1,
            'max-len': ['warn', { code: 100, tabWidth: 4 }],
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
];
