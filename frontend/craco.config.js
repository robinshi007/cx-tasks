const path = require('path');
const fs = require('fs');

const CircularDependencyPlugin = require('circular-dependency-plugin');
const WebpackBar = require('webpackbar');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss')(resolveApp('tailwind.config.js')), require('autoprefixer')],
    },
  },
  webpack: {
    plugins: [
      new WebpackBar(),
      new CircularDependencyPlugin({
        exclude: /node_modules/,
        include: /src/,
        failOnError: true,
        allowAsyncCycles: false,
        cwd: process.cwd(),
      }),
    ],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
    },
  },
};
