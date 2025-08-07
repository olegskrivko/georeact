// // import React, { createContext, useContext, useState, useEffect } from 'react';
// // const ThemeContext = createContext();
// // export const ThemeProviderContext = ({ children }) => {
// //   const [darkMode, setDarkMode] = useState(() => {
// //     return localStorage.getItem('darkMode') === 'true';
// //   });
// //   useEffect(() => {
// //     localStorage.setItem('darkMode', darkMode);
// //   }, [darkMode]);
// //   const toggleDarkMode = () => setDarkMode((prev) => !prev);
// //   return (
// //     <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
// //       {children}
// //     </ThemeContext.Provider>
// //   );
// // };
// // export const useDarkTheme = () => useContext(ThemeContext);
// // src/context/ThemeContext.js or .ts
// import React, { createContext, useEffect, useMemo, useState } from 'react';
// import CssBaseline from '@mui/material/CssBaseline';
// import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
// export const ThemeContext = createContext();
// const lightTheme = createTheme({
//   palette: {
//     mode: 'light',
//   },
// });
// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });
// export const ThemeProvider = ({ children }) => {
//   const [mode, setMode] = useState('light');
//   useEffect(() => {
//     const stored = localStorage.getItem('theme');
//     if (stored) {
//       setMode(stored);
//     }
//   }, []);
//   const toggleTheme = () => {
//     const newMode = mode === 'light' ? 'dark' : 'light';
//     setMode(newMode);
//     localStorage.setItem('theme', newMode);
//   };
//   const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);
//   return (
//     <ThemeContext.Provider value={{ mode, toggleTheme }}>
//       <MUIThemeProvider theme={theme}>
//         <CssBaseline />
//         {children}
//       </MUIThemeProvider>
//     </ThemeContext.Provider>
//   );
// };
// src/context/ThemeContext.js
// import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
// import { CssBaseline, ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material';
// const ThemeContext = createContext();
// const lightPalette = {
//   mode: 'light',
//   primary: { main: '#00b3a4', contrastText: '#ffffff' },
//   secondary: { main: '#FF5733', contrastText: '#ffffff' },
// };
// const darkPalette = {
//   mode: 'dark',
//   background: {
//     default: '#121212',
//     paper: '#1e1e1e',
//   },
//   text: {
//     primary: '#ffffff',
//     secondary: '#aaaaaa',
//   },
//   primary: {
//     main: '#00b3a4',
//     contrastText: '#ffffff',
//   },
//   secondary: {
//     main: '#FF5733',
//     contrastText: '#ffffff',
//   },
// };
// const getTheme = (mode) =>
//   createTheme({
//     palette: mode === 'dark' ? darkPalette : lightPalette,
//     components: {
//       MuiTypography: {
//         defaultProps: {
//           variantMapping: {
//             h1: 'h2',
//             h2: 'h2',
//             h3: 'h2',
//             h4: 'h2',
//             h5: 'h2',
//             h6: 'h2',
//             subtitle1: 'h2',
//             subtitle2: 'h2',
//             body1: 'span',
//             body2: 'span',
//           },
//         },
//       },
//     },
//   });
// export const ThemeProvider = ({ children }) => {
//   const [mode, setMode] = useState('light');
//   useEffect(() => {
//     const saved = localStorage.getItem('theme');
//     if (saved === 'dark') setMode('dark');
//   }, []);
//   const toggleTheme = () => {
//     setMode((prev) => {
//       const newMode = prev === 'light' ? 'dark' : 'light';
//       localStorage.setItem('theme', newMode);
//       return newMode;
//     });
//   };
//   const theme = useMemo(() => getTheme(mode), [mode]);
//   return (
//     <ThemeContext.Provider value={{ mode, toggleTheme }}>
//       <MUIThemeProvider theme={theme}>
//         <CssBaseline />
//         {children}
//       </MUIThemeProvider>
//     </ThemeContext.Provider>
//   );
// };
// export const useThemeContext = () => useContext(ThemeContext);
// theme/ThemeProvider.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { CssBaseline, ThemeProvider as MUIThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';

const ThemeContext = createContext();

const lightPalette = {
  mode: 'light',
  primary: { main: '#00b3a4', contrastText: '#ffffff' },
  secondary: { main: '#FF5733', contrastText: '#ffffff' },
  background: {
    default: '#fff',
    paper: '#ffffff',
  },
  text: {
    primary: '#000000',
    secondary: '#555555',
  },
  custom: {
    navbar: 'linear-gradient(190deg, #16477c 0%, #00b5ad 100%)',
    body: 'linear-gradient( #e3f2fd, #ffffff)',
    section: 'linear-gradient( #e3f2fd, #ffffff)',
    footer: 'linear-gradient(190deg, #16477c 0%, #00b5ad 100%)',
    card: {
      main: '#ffffff',
      contrastText: '#343a40',
    },
  },
};

const darkPalette = {
  mode: 'dark',
  primary: { main: '#00b3a4', contrastText: '#ffffff' },
  secondary: { main: '#FF5733', contrastText: '#ffffff' },
  background: {
    default: '#282828',
    paper: '#1e1e1e',
  },
  text: {
    primary: '#ffffff',
    secondary: '#aaaaaa',
  },
  custom: {
    navbar: '#1f1f1f', // or '#000000'
    body: '#282828',
    section: '#323232',
    footer: '#1f1f1f',
    card: {
      main: '#1f1f1f',
      contrastText: '#ffffff',
    },
  },
};

const getTheme = (mode) => {
  const palette = mode === 'dark' ? darkPalette : lightPalette;

  const baseTheme = createTheme({
    palette,
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            h1: 'h2',
            h2: 'h2',
            h3: 'h2',
            h4: 'h2',
            h5: 'h2',
            h6: 'h2',
            subtitle1: 'h2',
            subtitle2: 'h2',
            body1: 'span',
            body2: 'span',
          },
        },
      },
    },
  });

  return responsiveFontSizes(baseTheme);
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') setMode('dark');
  }, []);

  const toggleTheme = () => {
    setMode((prev) => {
      const newMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newMode);
      return newMode;
    });
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
