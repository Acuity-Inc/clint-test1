/**
 * @format
 */

import * as React from 'react';
import {AppRegistry, useColorScheme} from 'react-native';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import App from './src/App';

export default function Main() {
  const colorScheme = useColorScheme();
  const theme =
    colorScheme === 'light'
      ? {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            primary: 'rgb(120, 69, 172)',
            background: 'rgb(255, 251, 255)',
          },
        }
      : {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            primary: 'rgb(220, 184, 255)',
            background: 'rgb(29, 27, 30)',
          },
        };

  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
