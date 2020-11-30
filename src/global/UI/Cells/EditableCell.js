import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, SafeAreaView, TouchableHighlight, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { colors } from 'src/global/styles'

export default class EditableCell extends React.Component {
    render() {
        const { main, detail, mainStyle, detailStyle, onPress, onLongPress, onChange, editing, placeholder, type, onDownArrow, onUpArrow, items } = this.props
        let detailComponent
            if (editing) {
                switch (type) {
                    case 'picker': 
                        detailComponent = 
                        <RNPickerSelect
                            hideIcon
                            placeholder={{ label: placeholder, value: null }}
                            items={items}
                            onValueChange={(e)=>onChange(e)}
                            onUpArrow={onDownArrow}
                            onDownArrow={onUpArrow}
                            style={pickerStyles}
                            value={detail}
                        />
                        break;
                    default: // 'text'
                        detailComponent = 
                        <TextInput
                            style={styles.textInput}
                            value={detail}
                            placeholder={placeholder}
                            enablesReturnKeyAutomatically
                            autoFocus
                            returnKeyType="done"
                            selectionColor={colors.main}
                            onChange={(e)=>onChange(e)}
                        />
                        break;
                }
            }
            else {
                detailComponent = <Text style={[styles.detailText, detailStyle]} numberOfLines={1} >{detail}</Text>
            }

        return(
            <TouchableHighlight 
            underlayColor={'rgba(114,46,209,0.1)'}
            onPress={onPress}
            onLongPress={onLongPress}>
                <SafeAreaView style={styles.cell}>
                    <View style={styles.textContainer}>
                        <Text style={[styles.mainText, mainStyle]} numberOfLines={1} >{main}</Text>
                        <View style={styles.detailTextContainer}>
                           {detailComponent}
                        </View>
                    </View>
                </SafeAreaView>
            </TouchableHighlight>
        )
    }
}

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
    textInput: {
        fontSize: 18,
        width: '100%',
        color: colors.blue,
        textAlign: 'right',
    }
})

const pickerStyles = StyleSheet.create({
    inputIOS: {
        height: 30,
        padding: 5,
        color: colors.blue,
        fontSize: 18,
        textAlign: 'right',
    },
})

EditableCell.propTypes = {
    main: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    detail: PropTypes.string,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    onChange: PropTypes.func,
}

EditableCell.defaultProps = {
    main: '',
    detail: '',
    editing: false,
    placeholder: 'Placeholder',
    onChange: ()=>{}
}