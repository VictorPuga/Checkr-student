import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, FlatList, StyleSheet } from "react-native";

import { globalStyles } from 'src/global/styles'

class CollectionSelector extends React.Component {
    state = {
        items: [],
    }

    componentDidMount() {
        let items = []
        for (i = 0; i < this.props.numOfItems; i++) {
            items.push(' ')
        }
        this.setState({items})
    }

    render() {
        const { title, style, columns, extraData, renderItems } = this.props;
        return(
            <View style={style} >
                <Text style={globalStyles.subtitleBlack} >{title}</Text>
                <FlatList
                    data={this.state.items}
                    extraData={extraData}
                    keyExtractor={(item, index) => String(index)}
                    scrollEnabled={false}
                    numColumns={columns}
                    columnWrapperStyle={styles.list}
                    renderItem={({item, index}) => renderItems(item, index)}
                    />
            </View>
        )
    }
}

export default CollectionSelector

const styles = StyleSheet.create({
    button: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    list: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})

CollectionSelector.propTypes = {
    numOfItems: PropTypes.number,
    title: PropTypes.string,
    columns: PropTypes.number,
    extraData: PropTypes.object,
    renderItems: PropTypes.func,
}

CollectionSelector.defaultProps = {
    numOfItems: 1,
    title: '',
    columns: 1,
}

