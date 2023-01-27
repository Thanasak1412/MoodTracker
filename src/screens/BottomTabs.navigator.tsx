import React, { useCallback } from 'react';

// react-navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screens
import Home from '../screens/Home.screen';
import History from '../screens/History.screen';
import Analytics from '../screens/Analytics.screen';

// icons
import HomeIcon from '../components/HomeIcon';
import HistoryIcon from '../components/HistoryIcon';
import AnalyticIcon from '../components/AnalyticIcon';

// types
import { Props } from '../@types/icon';
import { RouteProp, ParamListBase } from '@react-navigation/native';

// themes
import { theme } from '../theme';

type TabIconProps = {
  routeName: string;
  color: string;
  size: number;
};

const BottomTabs = createBottomTabNavigator();

const bottomTabIcons: { [char: string]: React.FC<Props> } = {
  Home: HomeIcon,
  History: HistoryIcon,
  Analytics: AnalyticIcon,
};

const TabIcon = ({ routeName, ...props }: TabIconProps) => {
  const Icon = bottomTabIcons[routeName];
  return <Icon {...props} />;
};

const BottomTabsNavigator: React.FC = () => {
  const handleScreenOptions = useCallback(
    (route: RouteProp<ParamListBase, string>) => ({
      tabBarActiveTintColor: theme.colorBlue,
      tabBarInactiveTintColor: theme.colorGrey,
      tabBarShowLabel: false,
      headerTitleStyle: { fontFamily: theme.fontFamilyBold },
      tabBarIcon: ({ color, size }: { color: string; size: number }) => (
        <TabIcon routeName={route.name} color={color} size={size} />
      ),
    }),
    [],
  );

  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => handleScreenOptions(route)}>
      <BottomTabs.Screen name="Home" component={Home} />
      <BottomTabs.Screen name="History" component={History} />
      <BottomTabs.Screen name="Analytics" component={Analytics} />
    </BottomTabs.Navigator>
  );
};

export default BottomTabsNavigator;
