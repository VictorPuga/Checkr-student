import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

import { colors } from 'src/global/styles'

class AnswerCircle extends React.Component {
    render() {
        let { color, answer } = this.props
        return (
            <View style={[styles.circle, { backgroundColor: color }]} >
                <Text style={styles.correction}>{answer}</Text>
            </View>
        )
    }
}


class CheckAnswerCell extends React.Component {
    render() {
        let { number, answer, correctAnswer, isCorrect } = this.props
        let color = isCorrect ? colors.green : colors.red

        let correct = !isCorrect ? correctAnswer : null

        return (
            <SafeAreaView style={styles.cell}>
                <View style={styles.textContainer}>
                    <Text style={styles.mainText} numberOfLines={1} >{number}</Text>
                    <View style={styles.detailTextContainer}>
                        <AnswerCircle answer={answer} color={color} />
                        <Text style={styles.detailText}> {correct} </Text>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

export default CheckAnswerCell

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
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingLeft: 10,
    },
    mainText: {
        fontSize: 20,
    },
    detailText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#9A9A9A',
        width: 30,
    },
    correction: {
        fontSize: 18,
        color: 'white'
    },
    circle: {
        backgroundColor: 'gray',
        height: 30,
        width: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

CheckAnswerCell.propTypes = {
    number: PropTypes.number, 
    answer: PropTypes.string, 
    correctAnswer: PropTypes.string, 
    isCorrect: PropTypes.bool
}

AnswerCircle.propTypes = {
    color: PropTypes.string,
    answer: PropTypes.string,
}

CheckAnswerCell.defaultProps = {
    number: 1,
    answer: 'A',
    correctAnswer: 'A',
    isCorrect: true,
}

AnswerCircle.defaultProps = {
    color: colors.green,
    answer: 'A'
}