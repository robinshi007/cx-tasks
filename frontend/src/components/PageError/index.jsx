import React from 'react';

import { ErrorPage, ErrorPageInner, ErrorBox, Title } from './Styles';

const PageError = () => (
  <ErrorPage>
    <ErrorPageInner>
      <ErrorBox>
        <Title>Something went wrong</Title>
        <p>
          {'We’re not quite sure what went wrong. Please contact us or try looking on our '}
          <a href="https://localhost/">Help Center</a>
          {' if you need a hand.'}
        </p>
      </ErrorBox>
    </ErrorPageInner>
  </ErrorPage>
);

export default PageError;
