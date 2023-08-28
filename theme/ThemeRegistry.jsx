'use client';
import * as React from 'react';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import { Roboto } from 'next/font/google';

// const roboto = Roboto({
//   weight: ['300', '400', '500', '700'],
//   subsets: ['latin'],
//   display: 'swap',
// });

// import { createTheme } from '@mui/material/styles';

let lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#673ab7', // Purple color for primary elements
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff4081', // Pink color for secondary elements
      contrastText: '#fff',
    },
    text: {
      primary: '#333',
      secondary: '#777',
    },
    background: {
      paper: '#fff',
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#673ab7',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#673ab7',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#673ab7',
    },
  },
  spacing: factor => `${0.25 * factor}rem`,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#673ab7', // Purple color for app bar
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#673ab7', // Purple color for drawer background
        },
      },
    },
    // Customize other components as needed
  },
});

// Dark theme configuration
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#673ab7', // Purple color for primary elements
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff4081', // Pink color for secondary elements
      contrastText: '#fff',
    },
    text: {
      primary: '#fff',
      secondary: '#bbb',
    },
    background: {
      paper: '#333', // Dark background color
      default: '#222', // Dark default background color
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#673ab7',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#673ab7',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#673ab7',
    },
  },
  spacing: factor => `${0.25 * factor}rem`,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#673ab7', // Purple color for app bar
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#673ab7', // Purple color for drawer background
        },
      },
    },
    // Customize other components as needed
  },
});

// export { theme, darkTheme };

const themeWithResponsiveFont = responsiveFontSizes(lightTheme);

export default function ThemeRegistry({ children }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={themeWithResponsiveFont}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}