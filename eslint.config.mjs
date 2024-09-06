import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
    { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    {
        rules: {
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
            'no-undef': 0,
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
];
