import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { colors } from 'src/global/styles'

class CellAction extends React.Component {
    render() {
        const { color, left, title } = this.props
        const alignment = left ? 'flex-end' : 'flex-start'
        return(
            <View style={[styles.button, { backgroundColor: color, justifyContent: alignment }]}>
                <Text style={styles.text} >
                    {title}
                </Text>
            </View>
        )
    }
}

export default CellAction

const styles = StyleSheet.create({
    button: {
        alignItems:'center',
        justifyContent:'flex-start',
        backgroundColor: colors.purple,
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

CellAction.propTypes = {
    color: PropTypes.string,
    left: PropTypes.bool,
    title: PropTypes.string,
}

CellAction.defaultProps = {
    color: colors.red,
    left: false,
    title: ''
}