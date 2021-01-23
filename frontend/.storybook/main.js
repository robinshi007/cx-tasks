const path = require('path');

module.exports = {
  stories: ['../src/shared/components/**/*.stories.@(js|jsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
    '@storybook/preset-create-react-app',
  ],
  webpackFinal: async (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, '../src');
    return config;
  },
};

