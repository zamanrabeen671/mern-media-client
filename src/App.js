import { createTheme, ThemeProvider } from '@mui/material';
import { createContext, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import { ThemeProvider } from 'styled-components';
import './App.css';

import { AppRouter } from './routes';
export const AppContext = createContext();
function App() {
  const [mode, setMode] = useState('light')
  // console.log(mode)
  const customTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  console.log(customTheme)
  return (
    <AppContext.Provider value={[mode, setMode]}>
      <ThemeProvider theme={customTheme}>
        <Router>
          <AppRouter />
        </Router>
      </ThemeProvider>
    </AppContext.Provider>

  );
}

export default App;
