import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Aux } from 'src/global/hoc';
import Dimensions from 'Dimensions';

const { width, height } = Dimensions.get('window');

export default class extends React.Component {
    render() {
        const { loading, allScreen } = this.props

        return (
            <Aux>
                {
                    loading ?
                        <View style={allScreen ? null : styles['darkener']}>
                            <View style={styles[allScreen ? 'fullCoinatiner' : 'boxContainer']} >
                                <ActivityIndicator size="large"
                                    style={allScreen ? { position: 'absolute', top: '35%', left: '48%' } : { alignSelf: 'center', height: '100%' }}
                                    color={allScreen ? "#ffffff" : "#000"} />
                            </View>
                        </View> : null

                }
            </Aux>
        )
    }
};

const styles = StyleSheet.create({
    fullCoinatiner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: width,
        height: height,
        flex: 1,
        elevation: 800000,
        zIndex: 10000000000,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    boxContainer: {
        alignContent: 'center',
        position: 'absolute',
        top: height / 4,
        left: width / 2 - width * .16,
        backgroundColor: 'white',
        elevation: 800000,
        zIndex: 10000000000,
        width: '32%',
        aspectRatio: 1,
        borderRadius: 20
    },
    darkener: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: width,
        height: height,
        flex: 1,
        elevation: 8000,
        zIndex: 10000000,
        backgroundColor: 'rgba(0,0,0,0.25)'
    }
})