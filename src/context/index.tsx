/* eslint-disable eqeqeq */
import { ThemeProvider } from '@shopify/restyle';
import theme from '@styles/theme';
import React from 'react';


import { AuthProvider } from './auth';

type Props = {
  children: React.ReactNode;
};

const AppProviders: React.FunctionComponent<Props> = ({ children }) => (
  // <SafeAreaProvider>
    <ThemeProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  // </SafeAreaProvider>
);

export default AppProviders;
