import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from 'src/global/styles'

class CellButton extends React.Component {
    render() {
        const { color, left, title, onPress } = this.props
        const alignment = left ?  'flex-end' : 'flex-start'
        return(
            <TouchableOpacity  
                style={[styles.button, { backgroundColor: color, justifyContent: alignment }]} 
                activeOpacity={0.7} 
                onPress={onPress}>
                <Text style={styles.text} >
                    {title}
                </Text>
            </TouchableOpacity>
        )
    }
}

export default CellButton

const styles = StyleSheet.create({
    button: {
        alignItems:'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.red,
        flex: 1,
        flexDirection: 'row',
        minWidth: 75
    },
    text: {
        margin: 13.5,
        textAlign: 'center',
        width: 48,
        fontSize: 16,
        color: 'white'
    }
})

CellButton.propTypes = {
    color: PropTypes.string,
    left: PropTypes.bool,
    title: PropTypes.string,
    onPress: PropTypes.func,
}

CellButton.defaultProps = {
    color: colors.red,
    left: false,
    title: '',
}