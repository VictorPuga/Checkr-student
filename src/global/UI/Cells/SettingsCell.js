import React from 'react'
import PropTypes from "prop-types";
import { View, Text, TouchableHighlight, StyleSheet, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class SettingsCell extends React.Component {
    render() {
        const {onPress, main} = this.props
        return(
            <TouchableHighlight  
                underlayColor={'rgba(114,46,209,0.1)'}
                onPress={onPress}>
                <SafeAreaView style={styles.cell}>
                    <View style={styles.textContainer}>
                        <Text style={styles.mainText} numberOfLines={1} >{main}</Text>
                    </View>
                    <View style={styles.detailButton}><Ionicons name="ios-arrow-forward" size={20} color="#D1D1D1" /></View>
                </SafeAreaView>
            </TouchableHighlight>
            
        )
    }
}

export default SettingsCell

const styles = StyleSheet.create({
    cell: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        backgroundColor: 'white'
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    }, 
    mainText: {
        fontSize: 20,
    },   
    detailButton: {
        marginRight:10,
        alignItems: 'center',
    }
})

SettingsCell.propTypes = {
    main: PropTypes.string,
    onPress: PropTypes.func
}

SettingsCell.defaultProps = {
    main: '',
}