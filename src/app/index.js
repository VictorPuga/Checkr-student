import React from 'react';
import { View, StatusBar } from 'react-native';
import RootNavigator from './RootNavigation';
import { globalStyles } from 'src/global/styles';
export default class App extends React.Component {
    render() {
        return (
            <View style={globalStyles.app}>
                <StatusBar barStyle="light-content" />
                <RootNavigator />
            </View>
        );
    };
};