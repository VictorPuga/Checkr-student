import React from 'react'
import PropTypes from 'prop-types'
import { TouchableWithoutFeedback } from 'react-native'

class DoublePress extends React.Component {
    state = {
        lastPress: 0
    }

    checkDoublePress = () => {
        let delta = new Date().getTime() - this.state.lastPress

        if (delta < 400 ) {
            this.props.onDoublePress()
        }
        this.setState({lastPress: new Date().getTime()})
    }
    render() {
        return(
            <TouchableWithoutFeedback {...this.props} onPress={this.checkDoublePress} >
                {this.props.children}
            </TouchableWithoutFeedback>
        )
    }
}

export default DoublePress

DoublePress.propTypes = {
    onDoublePress: PropTypes.func,
    children: PropTypes.element,
}