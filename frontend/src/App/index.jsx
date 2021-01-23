import { ThemeProvider } from 'styled-components';
import theme from '@/shared/theme';

import CssBaseline from '@/shared/components/CssBaseline';
import Routes from './Routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
