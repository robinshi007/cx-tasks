import { addDecorator } from '@storybook/react';
import themeDecorator from './themeDecorator';

import '../src/assets/styles/tailwind.css';

addDecorator(themeDecorator);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
