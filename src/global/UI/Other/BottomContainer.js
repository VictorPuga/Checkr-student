import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { BlurView } from 'expo';
export default class extends React.Component {
    render() {
        return (
            <BlurView
                style={{
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: 20
                }}
                intensity={95}
            >
                <SafeAreaView>
                    {this.props.children}
                </SafeAreaView>
            </BlurView>
        )
    }
}