import React, { useEffect } from 'react';
import { Platform, UIManager } from 'react-native';

// navigation
import { NavigationContainer } from '@react-navigation/native';

// bottom-tabs
import BottomTabsNavigator from './screens/BottomTabs.navigator';

// Splash screen
import SplashScreen from 'react-native-splash-screen';

// contexts
import { AppProvider } from './App.provider';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AppProvider>
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
