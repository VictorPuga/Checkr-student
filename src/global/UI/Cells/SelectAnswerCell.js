import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { RoundButton } from 'src/global/UI'
import { colors } from 'src/global/styles'


class SelectAnswerCell extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return false
    }

    render() {
        let { selectAnswer, selectedAnswer, number } = this.props

        let selectedA = selectedAnswer === "A"
            ? { backgroundColor: colors.main }
            : { backgroundColor: 'gray' }

        let selectedB = selectedAnswer === "B"
            ? { backgroundColor: colors.main }
            : { backgroundColor: 'gray' }

        let selectedC = selectedAnswer === "C"
            ? { backgroundColor: colors.main }
            : { backgroundColor: 'gray' }

        let selectedD = selectedAnswer === "D"
            ? { backgroundColor: colors.main }
            : { backgroundColor: 'gray' }

        return (
            <SafeAreaView style={styles.cell}>
                <View style={styles.textContainer}>
                    <Text style={styles.mainText} numberOfLines={1} >{number}</Text>
                </View>
                <RoundButton title="A" style={[styles.roundButton, selectedA]} onPress={() => selectAnswer("A")} />
                <RoundButton title="B" style={[styles.roundButton, selectedB]} onPress={() => selectAnswer("B")} />
                <RoundButton title="C" style={[styles.roundButton, selectedC]} onPress={() => selectAnswer("C")} />
                <RoundButton title="D" style={[styles.roundButton, selectedD]} onPress={() => selectAnswer("D")} />
            </SafeAreaView>
        )
    }
}

export default SelectAnswerCell

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
    mainText: {
        fontSize: 20,
    },
    roundButton: {
        height: 36,
        width: 36,
        borderRadius: 18,
        marginHorizontal: 10,
        backgroundColor: 'gray'
    }
})

SelectAnswerCell.propTypes = {
    selectedAnswer: PropTypes.string,
    number: PropTypes.number,
    selectAnswer: PropTypes.func
}

SelectAnswerCell.defaultProps = {
    selectedAnswer: '?',
    number: 1,
}