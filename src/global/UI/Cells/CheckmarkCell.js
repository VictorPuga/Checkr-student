import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, SafeAreaView, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import { colors } from 'src/global/styles'

class CheckmarkCell extends React.Component {
    render() {
        const { main, mainStyle, onPress, checked } = this.props
        let checkmark = checked ? 'ios-checkmark' : null
        return(
            <TouchableHighlight 
            underlayColor={'rgba(114,46,209,0.1)'}
            onPress={onPress}>
                <SafeAreaView style={styles.cell}>
                    <View style={styles.textContainer}>
                        <Text style={[styles.mainText, mainStyle]} numberOfLines={1} >{main}</Text>
                        <View style={styles.detailContainer}>
                            <Ionicons name={checkmark} size={30} color={colors.blue} />
                        </View>
                    </View>
                </SafeAreaView>
            </TouchableHighlight>
        )
    }
}

export default CheckmarkCell

const styles = StyleSheet.create({
    cell: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        backgroundColor: 'white',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    }, 
    detailContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        alignItems: 'flex-end'
    }, 
    mainText: {
        fontSize: 20,
    },  
})

CheckmarkCell.propTypes = {
    main: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onPress: PropTypes.func,
    checked: PropTypes.bool
}

CheckmarkCell.defaultProps = {
    main: '',
    checked: false
}
