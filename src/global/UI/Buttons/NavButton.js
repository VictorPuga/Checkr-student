import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

class NavButton extends React.Component {
    render() {
        const { style, onPress, title } = this.props
        return(
            <TouchableOpacity  
                style={[styles.button, style]} 
                activeOpacity={0.35} 
                onPress={onPress}>
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
        )
    }
}

export default NavButton

const styles = StyleSheet.create({
    title: {
        justifyContent:'center',
        color: 'white',
        fontSize: 18,
    },
    button: {
        marginHorizontal: 10,
    }
})