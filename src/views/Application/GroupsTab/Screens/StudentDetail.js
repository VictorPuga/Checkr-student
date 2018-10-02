import React from 'react';
import { View, Text, FlatList, SafeAreaView, Alert } from 'react-native';
import { Query } from 'react-apollo';
import { DetailCell, LoadingHUD } from 'src/global/UI';
import { Aux } from 'src/global/hoc';
import { globalStyles } from 'src/global/styles';
import { GET_STUDENT } from '../Backend/GraphQL';

export default class StudentDetail extends React.Component {
    static navigationOptions = ({ navigation }) => ({ title: `Your Grades at ${navigation.getParam('groupName', 'This Group')}` });

    renderSeparator = () => (<View style={globalStyles.separator} />);

    renderEmptyComponent = () => (<SafeAreaView style={globalStyles.container}>
        <Text style={globalStyles.empty}  >This student profile has no grades.</Text>
    </SafeAreaView>);



    renderErrorAlert = () => Alert.alert(
        'Ooops!',
        'There has been an error fetching your grades for this group',
        [
            { text: 'Go back', onPress: this.props.navigation.goBack }
        ]
    );

    render() {
        return (
            <View style={globalStyles.container}>
                <Query
                    query={GET_STUDENT}
                    variables={{ studentId: this.props.navigation.getParam('studentId'), groupId: this.props.navigation.getParam('groupId') }}
                    fetchPolicy="network-only"
                >
                    {({ loading, error, data }) => (
                        <Aux>
                            <LoadingHUD loading={Boolean(loading)} />
                            {error ? this.renderErrorAlert() : null}
                            <FlatList
                                style={{ width: '100%' }}
                                ItemSeparatorComponent={this.renderSeparator}
                                ListEmptyComponent={this.renderEmptyComponent}
                                keyExtractor={(item, index) => String(index)}
                                data={data.getStudent.grades.items}
                                renderItem={
                                    ({ item, index }) =>
                                        <DetailCell
                                            main={item.appliedTestName}
                                            detail={String(item.grade)} />
                                } />
                        </Aux>

                    )}
                </Query>
            </View>
        );
    };
};

