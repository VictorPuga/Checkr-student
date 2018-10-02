import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableHighlight, StyleSheet, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Swipeable from 'react-native-swipeable';

const ANIMATION_DURATION = 1000;

class TitleCell extends React.Component {

    render() {
        let { title, onPress, ...rest } = this.props

        return(
            <Swipeable {...rest} >
                <TouchableHighlight 
                    underlayColor={'rgba(114,46,209,0.1)'}
                    onPress={onPress}>
                    <SafeAreaView style={cellStyles.cell}>
                        <View style={cellStyles.textContainer}>
                            <Text style={cellStyles.titleText} numberOfLines={1} >{title}</Text>
                        </View>
                        <View style={cellStyles.detailButton}><Ionicons name="ios-arrow-forward" size={20} color="#D1D1D1" /></View>
                    </SafeAreaView>
                </TouchableHighlight>
            </Swipeable>
                
        )
    }
}

export default TitleCell

const cellStyles = StyleSheet.create({
    cell: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
        backgroundColor: 'white',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
    }, 
    titleText: {
        width: '100%',
        fontSize: 25,
        fontWeight: 'bold',
    }, 
    detailButton: {
        marginRight:10
    }
    
})

TitleCell.propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
}

TitleCell.defaultProps = {
    title: '',
}