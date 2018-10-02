import React from "react";
import { View, Text, TextInput, Alert, SafeAreaView, } from "react-native";
import { globalStyles, colors } from "src/global/styles";
import { NavButton, RoundButton, LoadingHUD, BottomContainer } from "src/global/UI";
import { LINK_STUDENT_PROFILE_TO_USER } from '../Backend/GraphQL';
import { Mutation } from 'react-apollo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default class NewGroup extends React.Component {
    state = { studentId: "", groupId: "" };
    static navigationOptions = ({ navigation }) => ({ title: "New group", headerLeft: <NavButton title="Cancel" onPress={() => navigation.goBack()} />, });
    addGroup = async (linkStudentProfileToUser) => {
        const { studentId, groupId } = this.state;
        try {
            await linkStudentProfileToUser({ variables: { studentId, groupId } });
            this.props.navigation.goBack();
        } catch (e) {
            console.log('[Create Group Mutation]', e)
            this.renderErrorAlert();
        } finally {
            this.setState({ studentId: "", groupId: "" });
        };
    };
    inputRefs = {};
    renderErrorAlert = () => Alert.alert(
        'Ooops!', 'There has been a problem adding this student profile to your account \n Please try again later',
        [{ text: 'Go back', onPress: this.props.navigation.goBack }]);
    render() {
        return (
            <SafeAreaView style={globalStyles.app} >
                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={{
                        width: '90%',
                        alignSelf: 'center',
                    }}
                    extraScrollHeight={100}>
                    <Text style={[globalStyles.subtitleBlack, { marginTop: 20 }]}>Your Group's ID</Text>
                    <TextInput
                        ref={el => { this.inputRefs.group = el }}
                        enablesReturnKeyAutomatically
                        returnKeyType="next"
                        onSubmitEditing={() => this.inputRefs.student.focus()}
                        value={this.state.groupId}
                        onChangeText={groupId => this.setState({ groupId })}
                        selectionColor={colors.main}
                        style={[globalStyles.input]}
                        autoCorrect={false}
                        placeholder="Group ID"
                    />
                    <Text style={[globalStyles.subtitleBlack, { marginTop: 20 }]}>Your Student ID</Text>
                    <TextInput
                        ref={el => { this.inputRefs.student = el }}
                        enablesReturnKeyAutomatically
                        returnKeyType="done"
                        value={this.state.studentId}
                        onChangeText={studentId => this.setState({ studentId })}
                        selectionColor={colors.main}
                        style={[globalStyles.input]}
                        autoCorrect={false}
                        placeholder="Student ID"
                        onSubmitEditing={this.addGroup}
                    />
                </KeyboardAwareScrollView>
                <BottomContainer>
                    <Mutation
                        mutation={LINK_STUDENT_PROFILE_TO_USER}
                        optimisticResponse={{
                            linkStudentProfileToUser: {
                                __typename: "student",
                                id: this.state.studentId,
                                groupId: this.state.groupId
                            }
                        }}
                        fetchPolicy='network-only'
                    >
                        {(linkStudentProfileToUser, { loading, error, data, called }) =>
                            (
                                <View>
                                    {error ? this.renderErrorAlert() : null}
                                    <LoadingHUD loading={loading} />
                                    <RoundButton
                                        style={{ backgroundColor: colors.main }}
                                        title="Save Group"
                                        onPress={() => this.addGroup(linkStudentProfileToUser)}
                                    />
                                </View>
                            )}
                    </Mutation>
                </BottomContainer>
            </SafeAreaView>
        );
    }
}