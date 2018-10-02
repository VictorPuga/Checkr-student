import React from 'react';
import { globalStyles, colors } from 'src/global/styles';
import { View, Text, SafeAreaView } from 'react-native';
export default class extends React.Component {
    render() {
        return (
            <SafeAreaView>
                <View>
                    <Text>Hey!</Text>
                </View>
            </SafeAreaView>
        )
    }
}