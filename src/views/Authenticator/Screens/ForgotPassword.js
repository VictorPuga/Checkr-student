import React from 'react';
import { RoundButton, LoadingHUD, BottomContainer } from 'src/global/UI';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput, View, SafeAreaView, Text, Alert, Button } from 'react-native';
import { Auth } from 'aws-amplify';
import { globalStyles, colors } from 'src/global/styles';

export default class extends React.Component {
    static navigationOptions = ({ navigation }) => ({ title: "Change Password" });
    state = { newPassword: '', username: '', newPasswordConfirmation: '', loading: false };
    inputRefs = {};
    changePassword = async () => {
        this.setState({ loading: true });
        const { username, newPassword, newPasswordConfirmation } = this.state;
        let data = null;
        try {
            if (username && newPassword && newPasswordConfirmation) {
                if (newPassword === newPasswordConfirmation) {
                    data = await Auth.forgotPassword(username)
                } else {
                    Alert.alert("Both passwords don't match")
                };
            } else {
                Alert.alert('Please make sure to fill all fields')
            };
        } catch (e) {
            console.log('[Forgot Password]', e);
            Alert.alert('Ooops!', e.message + ' \n  Please try again.');
        } finally {
            this.setState({ loading: false });
            if (data) { this.props.navigation.navigate('ConfirmCode', { newPassword, username }) };
        };
    };
    render() {
        return (
            <SafeAreaView style={globalStyles.app}>
                <LoadingHUD loading={this.state.loading} />
                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={{
                        width: '90%',
                        alignSelf: 'center',
                    }}
                    extraScrollHeight={100}>                    <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 20, fontWeight: '600' }}>Plase fill the following fields</Text>
                    <Text>Username or email</Text>
                    <TextInput
                        autoCapitalize='none'
                        ref={el => { this.inputRefs.username = el; }}
                        returnKeyType="next"
                        enablesReturnKeyAutomatically
                        onSubmitEditing={() => this.inputRefs.newPassword.focus()}
                        value={this.state.groupId}
                        onChangeText={username => this.setState({ username })}
                        selectionColor={colors.main}
                        style={[globalStyles.input, { marginBottom: 20 }]}
                        autoCorrect={false}
                        placeholder="Username"
                    />
                    <Text>New Password</Text>
                    <TextInput
                        autoCapitalize='none'
                        ref={el => { this.inputRefs.newPassword = el; }}
                        secureTextEntry
                        returnKeyType="next"
                        enablesReturnKeyAutomatically
                        onSubmitEditing={() => this.inputRefs.newPasswordConfirmation.focus()}
                        value={this.state.groupId}
                        onChangeText={newPassword => this.setState({ newPassword })}
                        selectionColor={colors.main}
                        style={[globalStyles.input, { marginBottom: 20 }]}
                        autoCorrect={false}
                        placeholder="Password"
                    />
                    <Text>Confirm Password</Text>
                    <TextInput
                        autoCapitalize='none'
                        ref={el => { this.inputRefs.newPasswordConfirmation = el; }}
                        secureTextEntry
                        returnKeyType="done"
                        enablesReturnKeyAutomatically
                        onSubmitEditing={this.changePassword}
                        value={this.state.groupId}
                        onChangeText={newPasswordConfirmation => this.setState({ newPasswordConfirmation })}
                        selectionColor={colors.main}
                        style={[globalStyles.input, { marginBottom: 20 }]}
                        autoCorrect={false}
                        placeholder="Confirm Password"
                    />
                </KeyboardAwareScrollView>
                <BottomContainer>
                    <RoundButton
                        title='Change Password'
                        style={{ backgroundColor: colors.main }}
                        onPress={this.changePassword} />
                </BottomContainer>
            </SafeAreaView>
        );
    };
};