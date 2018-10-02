import React from 'react'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'

class ClassIcon extends React.Component {

    render() {
        const { is, size, ...rest } = this.props
        const icon = icons[is]
        return(
            <Ionicons {...rest} name={icon} size={size} color={'white'}  />
        )
    }
}

export default ClassIcon

const icons = [
    'md-create',            // 0
    'md-calculator',        // 1
    'ios-flask',            // 2
    'ios-color-palette',    // 3
    'md-globe',             // 4
    'ios-leaf',             // 5
    'ios-thermometer',      // 6
    'ios-bulb',             // 7
    'ios-quote',            // 8
    'md-code', 
    'md-flower', 
    'md-leaf', 
    'md-map', 
    'md-man',
    // 'md-round-brush', 
    'md-quote', 
    // 'md-dollar-sign', 
    'md-mic', 
    // 'md-sthetoscope', 
    //'md-graduation-camp', 
    // 'md-question', 
    //'md-ruler',
]

ClassIcon.propTypes = {
    is: PropTypes.number,
    size: PropTypes.number,
}

ClassIcon.defaultProps = {
    is: 0,
    size: 30,
}