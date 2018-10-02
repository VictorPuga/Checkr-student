import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import * as Views from '.';
import { colors } from 'src/global/styles';
const { GroupsTab, AccountTab } = Views;
export default createBottomTabNavigator(
  {
    Groups: GroupsTab,
    Account: AccountTab
  },
  {
    initialRouteName: 'Groups',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Groups') {
          iconName = 'ios-people';
        } else if (routeName === 'Account') {
          iconName = 'ios-contact';
        };
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
      tabBarOptions: {
        activeTintColor: colors.main,
        inactiveTintColor: 'gray',
      },
    })
  }
);