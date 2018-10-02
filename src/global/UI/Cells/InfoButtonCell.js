import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

class InfoButtonCell extends React.Component {
    render() {
        const { main, detail, onPress } = this.props
        return(
            <SafeAreaView style={styles.cell}>
                <View style={styles.textContainer}>
                    <Text style={styles.mainText} numberOfLines={1} >{main}</Text>
                    <View style={styles.detailTextContainer}>
                        <Text style={styles.detailText} numberOfLines={1} >{detail}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={onPress}>
                    <View style={styles.detailButton}>
                        <Ionicons name="ios-information-circle-outline" size={25} color="#1D9BF6" />
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

export default InfoButtonCell

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
    detailTextContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
    }, 
    mainText: {
        fontSize: 20,
    },  
    detailText: {
        fontSize: 18,
        color: '#9A9A9A',
        alignSelf: 'flex-end',
    },  
    detailButton: {
        marginRight:10,
        alignItems: 'center',
    }
})

InfoButtonCell.propTypes = {
    main: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    detail: PropTypes.string,
    onPress: PropTypes.func,
}

InfoButtonCell.defaultProps = {
    main: '',
    detail: '',
}
