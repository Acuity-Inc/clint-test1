import {StyleSheet} from 'react-native';
import {MD3Theme} from 'react-native-paper';

const AppStyles = (themeStyles: MD3Theme) =>
  StyleSheet.create({
    buttonContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      margin: 20,
      alignItems: 'center',
    },
    button: {
      marginTop: 10,
      marginBottom: 10,
    },
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: themeStyles.colors.background,
      alignItems: 'center',
    },
    context: {
      marginTop: 20,
    },
    icon: {
      marginTop: 40,
      textAlign: 'center',
    },
    scrollview: {
      marginTop: 20,
      width: '100%',
    },
    title: {
      color: themeStyles.colors.secondary,
      paddingTop: 40,
    },
    text: {
      color: themeStyles.colors.secondary,
      paddingTop: 40,
    },
  });
export default AppStyles;
