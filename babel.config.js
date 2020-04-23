module.exports = api => {
  api.cache(true);

  function config(useESModules = true) {
    return {
      presets: [
        [
          '@babel/preset-react',
          {
            development: true,
          },
        ],
        [
          '@babel/preset-env',
          {
            modules: useESModules ? false : 'commonjs',
            targets: {
              browsers: ['last 2 versions'], // @todo fill out
            },
          },
        ],
        [
          '@babel/preset-typescript',
          {
            isTSX: true,
            allExtensions: true,
            jsxPragma: 'React',
          },
        ],
      ],
      plugins: [
        'transform-class-properties',
        '@babel/plugin-syntax-dynamic-import',
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: false,
            helpers: true,
            regenerator: true,
            useESModules,
          },
        ],
      ],
    };
  }

  return {
    ...config(true),
    env: {
      test: config(false),
    },
  };
};
