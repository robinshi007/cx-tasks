/* craco.config.js */
/* refer https://juejin.cn/post/6871148364919111688 */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackBar = require('webpackbar');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const CracoLessPlugin = require('craco-less');
const { whenDev, whenProd, when } = require('@craco/craco');
const path = require('path');

const isBuildAnalyzer = process.env.BUILD_ANALYZER === 'true';

module.exports = {
  babel: {
    presets: [],
    plugins: [
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ], // support decorators
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true, // true to support less
        },
        'antd',
      ],
    ],
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // config file extension
      webpackConfig.resolve.extensions = [
        ...webpackConfig.resolve.extensions,
        ...['.scss', '.less'],
      ];
      return webpackConfig;
    },
    // alias
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    plugins: [
      new WebpackBar({ profile: true }),
      // add circular dependency check
      ...whenDev(
        () => [
          new CircularDependencyPlugin({
            exclude: /node_modules/,
            include: /src/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: process.cwd(),
          }),
        ],
        []
      ),
      ...when(
        isBuildAnalyzer,
        () => [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: path.resolve(__dirname, `analyzer.html`),
          }),
        ],
        []
      ),
    ],
  },
  plugins: [
    // support less
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#ddd',
              '@border-radius-base': '2px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
