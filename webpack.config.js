const path = require('path');

module.exports = {
  entry: './src/index.ts',
  resolve: { extensions: ['.ts', '.tsx', '.js'] },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    react:              { commonjs: 'react', commonjs2: 'react', amd: 'React', root: 'React' },
    'react-dom':        { commonjs: 'react-dom', commonjs2: 'react-dom' },
    'react-router-dom': { commonjs: 'react-router-dom', commonjs2: 'react-router-dom' },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: { name: 'AdiAuth', type: 'umd' },
    globalObject: 'this',
    clean: true,
  },
};
