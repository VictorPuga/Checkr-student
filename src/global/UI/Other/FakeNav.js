import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native';

import { NavButton } from 'src/global/UI'

import { colors } from 'src/global/styles'


class FakeNav extends Component {
    render() {
        const { title, onCancel, onEdit } = this.props
        let cancelButton = onCancel 
            ? <NavButton title="Cancel" onPress={onCancel} style={styles.cancelButton}/> 
            : null
        let editButton = onEdit 
            ? <NavButton title="Edit" onPress={onEdit} style={styles.editButton}/> 
            : null
        return (
            <View style={styles.outerContainer}>
                {cancelButton}
                <View style={styles.innerContainer}>
                    <Text style={styles.title} numberOfLines={1} >{title}</Text>
                    
                </View>
                {editButton}
            </View>
        )
    }
}

export default FakeNav;

const styles= StyleSheet.create({
    outerContainer: {
        width: '100%',
        backgroundColor: colors.main, 
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: colors.mainDarker,
        borderBottomWidth: 1,
    },
    innerContainer: {
        marginHorizontal: 85, // This may need some adjustments!!!
        position: 'absolute',
    }, 
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    cancelButton: {
        position: 'absolute',
        alignSelf: 'flex-start',
    },
    editButton: {
        alignSelf: 'flex-end',
    }
})

FakeNav.propTypes = {
    title: PropTypes.string,
    onCancel: PropTypes.func,
    onEdit: PropTypes.func,
}

FakeNav.defaultProps = {
    title: '',
}