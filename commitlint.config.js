module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'header-max-length': [0, 'always', 0],
        'type-enum': [
            2, // nível de erro (2 = erro, 1 = warning)
            'always',
            [
                'feat',
                'fix',
                'chore',
                'docs',
                'style',
                'refactor',
                'test',
                'ci',
                'build',
                'perf',
                'revert',
                'merge'
            ]
        ]
    }
};
