import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        rules: {
            semi: 'error',
            indent: ['error', 4],
            quotes: [2, 'single'],
            eqeqeq: 1,
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
    },
];
