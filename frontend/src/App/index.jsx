import { ThemeProvider } from 'styled-components';
import theme from '@/shared/theme';

import '@/assets/styles/tailwind.css';

//import CssBaseline from '@/shared/components/CssBaseline';
import Routes from './Routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
