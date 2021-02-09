const path = require('path');

module.exports = {
  stories: [
    '../src/shared/components/**/*.stories.mdx',
    '../src/shared/components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
    '@storybook/preset-create-react-app',
  ],
  webpackFinal: async (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, '../src');
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [require('tailwindcss')('./tailwind.config.js'), require('autoprefixer')],
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });
    return config;
  },
};
