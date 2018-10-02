import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, SafeAreaView, TouchableHighlight } from 'react-native';

import { colors } from 'src/global/styles'


class DetailCell extends React.Component {
    render() {
        const { main, detail, mainStyle, detailStyle, onPress, checked } = this.props
        return(
            <TouchableHighlight 
            underlayColor={'rgba(114,46,209,0.1)'}
            onPress={onPress}>
                <SafeAreaView style={styles.cell}>
                    <View style={styles.textContainer}>
                        <Text style={[styles.mainText, mainStyle]} numberOfLines={1} >{main}</Text>
                        <View style={styles.detailTextContainer}>
                            <Text style={[styles.detailText, detailStyle]} numberOfLines={1} >{detail}</Text>
                        </View>
                    </View>
                </SafeAreaView>
            </TouchableHighlight>
        )
    }
}

export default DetailCell

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
})

DetailCell.propTypes = {
    main: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    detail: PropTypes.string,
    onPress: PropTypes.func,
}

DetailCell.defaultProps = {
    main: '',
    detail: '',
}
