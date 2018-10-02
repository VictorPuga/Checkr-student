import React from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

class IconButton extends React.Component {
    render() {
        const { onPress, name } = this.props
        return(
            <TouchableOpacity  
                style={styles.IconButton} 
                activeOpacity={0.35} 
                onPress={onPress}>
                <Ionicons name={name} size={35} color="white" />
            </TouchableOpacity>
        )
    }
}

export default IconButton

const styles = StyleSheet.create({
    IconButton: {
        height: 35,
        width: 35,
        alignItems:'center',
        justifyContent:'center',
    }
})

IconButton.propTypes = {
    onPress: PropTypes.func
}