import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native';
import { StoragedDataProvider } from './src/hooks/storagedata';

import { AppRoutes } from './src/routes/app.routes';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/global/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <StoragedDataProvider>
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </StoragedDataProvider>
    </ThemeProvider>
  );
}