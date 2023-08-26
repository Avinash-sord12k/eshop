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

let theme = createTheme({
  palette: {
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
    mode: 'light',
  },
  typography: {
    fontFamily: 'Poppins, Roboto, sans-serif',
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
theme = responsiveFontSizes(theme);

export default function ThemeRegistry({ children }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}