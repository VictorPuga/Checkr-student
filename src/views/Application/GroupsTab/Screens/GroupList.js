import React from 'react';
import { View, Text, Button, FlatList, SafeAreaView, Alert } from 'react-native';
import { IconButton, CardCell } from 'src/global/UI';
import { globalStyles, colors } from 'src/global/styles';
import { API, graphqlOperation } from 'aws-amplify';
import { GET_STUDENT_PROFILES, GET_GROUPS } from "../Backend/GraphQL";

export default class GroupList extends React.Component {
    state = { groups: [], loading: false };

    static navigationOptions = ({ navigation }) => ({
        title: 'Groups',
        headerLeft: <IconButton name="ios-add" onPress={() => navigation.navigate('NewGroup', { refresh: navigation.getParam('refresh') })} />,
    })

    async componentDidMount() {
        await this.fetchGroups()
        this.props.navigation.setParams({
            refresh: () => this.fetchGroups(),
        })
    }

    fetchGroups = async () => {
        this.setState({ loading: true });
        let groups = [];
        let fetchPolicy = 'network-only';
        try {
            //STPS === Student Profiles :)
            STPs = await API.graphql(graphqlOperation(GET_STUDENT_PROFILES))
            STPsGroupIds = await STPs.data.queryStudentsByGroupIdNameIndex.items.map(stud => stud.groupId);
            studentProfileIds = await STPs.data.queryStudentsByGroupIdNameIndex.items.map(stud => stud.id)
            groupsPromises = await STPsGroupIds.map(async groupId => await API.graphql(graphqlOperation(GET_GROUPS, { groupId })))
            groupsResponses = await Promise.all(groupsPromises);
            groupsObjects = await groupsResponses.map(groupResponse => groupResponse.data.queryGroupsByUserIdNameIndex.items[0])
            groups = await groupsObjects.map((group, i) => ({ id: group.id, icon: Number(group.icon), color: Number(group.color), name: group.name, studentId: studentProfileIds[i] }));
        } catch (e) {
            console.log('[Group List Screen Data Fetching]', e);
            Alert.alert('Ooops!', 'There has been an error fetching your groups, please try again later');
            return (e);
        } finally {
            this.setState({ groups, loading: false });
        };
    };

    renderSeparator = () => this.state.groups.length > 1 ? <View style={{ height: 40 }} /> : null;

    goToGroup = (studentId, groupName, groupId) => this.props.navigation.navigate('StudentDetail', { studentId, groupName, groupId })

    renderEmptyComponent = () => {
        let text = this.state.loading ? 'Retrieving groups...' : 'It looks like you haven\'t linked any groups....'
        let button = this.state.loading ? null 
        : <Button
        title="Add a new one"
        color={colors.main}
        onPress={() => this.props.navigation.navigate('NewGroup', { refresh: this.fetchGroups })} />
        return (
        <SafeAreaView style={globalStyles.container}>
            <View style={globalStyles.container}>
                <Text style={globalStyles.empty}  >{text}</Text>
                {button}
            </View>
        </SafeAreaView>
    )}

    render() {
        return (
            <View style={globalStyles.container}>
                <FlatList
                    style={{ width: '100%' }}
                    contentContainerStyle={{ alignItems: 'center' }}
                    ListEmptyComponent={this.renderEmptyComponent}
                    ListHeaderComponent={<View style={{ height: 40 }} />}
                    ListFooterComponent={<View style={{ height: 40 }} />}
                    ItemSeparatorComponent={this.renderSeparator}
                    refreshing={this.state.loading}
                    onRefresh={this.fetchGroups}
                    keyExtractor={(item, index) => String(index)}
                    data={this.state.groups}
                    extraData={this.state}
                    renderItem={
                        ({ item }) =>
                            <CardCell
                                title={item.name}
                                color={item.color}
                                icon={item.icon}
                                onPress={() => this.goToGroup(item.studentId, item.name, item.id)}
                            />
                    } />
            </View>
        )
    }
};