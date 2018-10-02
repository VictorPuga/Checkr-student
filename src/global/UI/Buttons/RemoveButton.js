import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from 'src/global/styles'

class RemoveButton extends React.Component {
    render() {
        const { style, onPress } = this.props
        return(
            <TouchableOpacity  
                style={[styles.button, style]} 
                activeOpacity={0.8} 
                onPress={onPress}>
                <View style={styles.minus} />
            </TouchableOpacity>
        )
    }
}

export default RemoveButton

const styles = StyleSheet.create({
    button: {
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: colors.red,
        borderRadius: 15,
        height: 30,
        width: 30,
    },
    minus: {
        backgroundColor: 'white',
        borderRadius: 2,
        height: 4,
        width: 18,
    }
})

RemoveButton.propTypes = {
    onPress: PropTypes.func,
}