import React from 'react'
import PropTypes from "prop-types";
import {View, Text, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import { ClassIcon, RemoveButton } from 'src/global/UI';

import { objectToArray } from 'src/global/utilities'

import {colors} from 'src/global/styles'

class CardCell extends React.Component {
    render() {
        const { title, detail, color, onPress, icon, disabled, style, isEditing, onDelete } = this.props

        const THEColor = objectToArray(colors)[color]

        let removeButton = isEditing ? <RemoveButton style={styles.button} onPress={onDelete} /> : null

        return(
            <TouchableOpacity 
                activeOpacity={0.85}
                onPress={onPress}
                disabled={disabled}
                style={[styles.card, {backgroundColor: THEColor}, style]}>
                <SafeAreaView>
                    {removeButton}
                    <View style={styles.iconContainer}>
                        <ClassIcon
                            is={icon}
                            style={styles.icon}
                            size={200} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.titleText} numberOfLines={1} >{title}</Text>
                        <Text style={styles.detailText} numberOfLines={1} >{detail}</Text>
                    </View>
                </SafeAreaView>
            </TouchableOpacity>
        )
    }
}

export default CardCell

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
        height: 300,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOffset: {height: 5, width: 5},
        shadowOpacity: 0.5,
        shadowRadius: 10
    },
    textContainer: {
        flex: 1,
        padding: 0,
        width: 270,
        top: 200,
        left: 15,
    }, 
    titleText: {
        width: '100%',
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
    }, 
    detailText: {
        color: 'white',
        fontSize: 30,
    },
    iconContainer: {
        left: 15,
        top: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        left: -15,
        top: -15,
        position: 'absolute'
    }
})

CardCell.propTypes = {
    title: PropTypes.string,
    detail: PropTypes.string,
    color: PropTypes.number,
    onPress: PropTypes.func,
    onDelete: PropTypes.func,
    icon: PropTypes.number,
    disabled: PropTypes.bool,
    isEditing: PropTypes.bool,
}

CardCell.defaultProps = {
    title: '',
    detail: '', 
    color: 0,
    icon: 0,
    disabled: false,
    editing: false,
}