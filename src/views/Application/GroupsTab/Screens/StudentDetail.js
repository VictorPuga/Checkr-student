import React from 'react';
import { View, Text, FlatList, SafeAreaView, Alert } from 'react-native';
import { DetailCell } from 'src/global/UI';
import { globalStyles } from 'src/global/styles';
import { removeTimestamp } from 'src/global/utilities';
import { API, graphqlOperation } from 'aws-amplify'
import { GET_STUDENT } from '../Backend/GraphQL';

export default class StudentDetail extends React.Component {
    state = {
        loading: false,
        grades: []
    }
    static navigationOptions = ({ navigation }) => ({ title: `Your Grades at ${navigation.getParam('groupName', 'This Group')}` });

    async componentDidMount() {
        await this.fetchGrades()
    }

    renderSeparator = () => <View style={globalStyles.separator} />

    renderEmptyComponent = () => {
        let text = this.state.loading ? 'Retrieving grades...' : 'It looks like you have no grades.'
        return (
        <SafeAreaView style={globalStyles.container}>
            <Text style={globalStyles.empty}  >{text}</Text>
        </SafeAreaView>
    )}

    renderErrorAlert = () => Alert.alert(
        'Ooops!',
        'There has been an error fetching your grades for this group',
        [
            { text: 'Go back', onPress: this.props.navigation.goBack }
        ]
    );

    fetchGrades = async() => {
        let grades, error
        await this.setState({loading: true})
        try {
            grades = await API.graphql(graphqlOperation(GET_STUDENT, { studentId: this.props.navigation.getParam('studentId'), groupId: this.props.navigation.getParam('groupId') }))
            grades = await grades.data.getStudent.grades.items.map(grade => {
                grade.appliedTestName = removeTimestamp(grade.appliedTestName)
                return grade
            })

        }
        catch (e) {
            error = e
            console.log('[StudentDetail.js]:', e)
        }
        finally {
            if (!error) {
                await this.setState({grades, loading: false})
            }
            else {
                Alert.alert('Oops', 'Something went wrong while loading your tests.')
                await this.setState({loading: false})
            }
        }
    }

    render() {
        return (
            <View style={globalStyles.container}>
                <FlatList
                    style={{ width: '100%' }}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListEmptyComponent={this.renderEmptyComponent}
                    keyExtractor={(item, index) => String(index)}
                    refreshing={this.state.loading}
                    onRefresh={this.fetchGrades}
                    data={this.state.grades}
                    renderItem={ ({ item, index }) =>
                        <DetailCell
                            main={item.appliedTestName}
                            detail={String(item.grade)} />
                    } />
            </View>
        );
    };
};

