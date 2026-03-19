const path = require('path');

const common = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: { transpileOnly: true },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports = [
  // ✅ UMD build
  {
    ...common,
    externals: {
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
        root: 'React',
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'react-dom',
        root: 'ReactDOM',
      },
      'react-router-dom': {
        commonjs: 'react-router-dom',
        commonjs2: 'react-router-dom',
        amd: 'react-router-dom',
      },
      '@gadagi/design-system': {
        commonjs: '@gadagi/design-system',
        commonjs2: '@gadagi/design-system',
        amd: '@gadagi/design-system',
      },
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      library: 'gadagiAuth',
      libraryTarget: 'umd',
      globalObject: 'this',
    },
  },

  // ✅ ESM build
  {
    ...common,
    externals: [
      'react',
      'react-dom',
      'react-router-dom',
      '@gadagi/design-system',
    ],
    experiments: {
      outputModule: true,
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.esm.js',
      library: {
        type: 'module',
      },
    },
  },
];