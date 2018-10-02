import React from 'react';
import { RoundButton, LoadingHUD, BottomContainer } from 'src/global/UI';
import { TextInput, View, SafeAreaView, Text, Alert, Button } from 'react-native';
import { Auth } from 'aws-amplify';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { globalStyles, colors } from 'src/global/styles';

export default class extends React.Component {
    static navigationOptions = ({ navigation }) => ({ title: "Confirm Email Code" });
    state = {
        username: this.props.navigation.getParam('username', ''),
        code: "",
        loading: false,
        password: this.props.navigation.getParam('password', ''),
        newPassword: this.props.navigation.getParam('newPassword', ''),
        recievedNewPassword: Boolean(this.props.navigation.getParam('newPassword', null)),
        recievedUsername: Boolean(this.props.navigation.getParam('username', null)),
    };
    inputRefs = {};
    resendCode = async () => {
        this.setState({ loading: true })
        const { username, recievedNewPassword } = this.state;
        let data = null;
        try {
            data = recievedNewPassword ? await Auth.forgotPassword(username) : await Auth.resendSignUp(username);
        } catch (e) {
            console.log('[Confirm Code]', e);
            Alert.alert('Ooops!', e.message + ' \n  Please try again.');
        } finally {
            this.setState({ loading: false });
            if (data) { Alert.alert('Data successfully sent to email address') };
        };
    };
    confirmCode = () => {
        if (this.state.recievedNewPassword) {
            this.confirmNewPasswordCode()
        } else {
            this.confirmEmailCode()
        };
    };
    confirmEmailCode = async () => {
        this.setState({ loading: true })
        const { username, code, password } = this.state;
        let confirmation = null;
        let user = null;
        try {
            if (username && code) {
                confirmation = await Auth.confirmSignUp(username, code)
            } else {
                throw ({ message: 'Username connot be empty.' });
            }
        } catch (e) {
            console.log('[Confirm Code]', e);
            Alert.alert('Ooops!', e.message.replace(' Please try again.', 0) + ' \n  Please try again.');
        } finally {
            this.setState({ loading: false });
            if (confirmation) {
                try {
                    user = await Auth.signIn(username, password);
                } catch (e) {
                    console.log('[Confirm Code Sign In]', e);
                    Alert.alert('Ooops!', e.message + ' \n Please try to sign in', [{ onPress: () => this.props.navigation.navigate('SignIn') }]);
                } finally {
                    if (user) { this.props.navigation.navigate('SplashScreen') };
                };
            };
        };
    };
    confirmNewPasswordCode = async () => {
        this.setState({ loading: true })
        const { username, code, newPassword } = this.state;
        let confirmation = true;
        let user = null;
        try {
            //promise will resolove as value undifined, that's why we init confirmation as true and look for its false-ness
            //pls forgive me
            confirmation = await Auth.forgotPasswordSubmit(username, code, newPassword)
        } catch (e) {
            console.log('[Confirm New Password Code]', e);
            Alert.alert('Ooops!', e.message.replace('please try again', ' \n lol Please try again.'));
        } finally {
            if (!confirmation) {
                try {
                    user = await Auth.signIn(username, newPassword);
                } catch (e) {
                    console.log('[Confirm New Password Code Sign In]', e);
                    Alert.alert('Ooops!', e.message + ' \n Please try to sign in', [{ onPress: () => this.props.navigation.navigate('SignIn') }]);
                } finally {
                    this.setState({ loading: false });
                    if (user) { this.props.navigation.navigate('SplashScreen') };
                };
            };
        };
    };
    render() {
        const { loading, recievedUsername } = this.state;
        return (
            <SafeAreaView style={globalStyles.app}>
                <LoadingHUD loading={loading} />
                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={{
                        width: '90%',
                        alignSelf: 'center',
                    }}
                    extraScrollHeight={100}>
                    <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 20, fontWeight: '600' }}>
                        Plase enter your email confirmation code
                    </Text>
                    {
                        recievedUsername ? null : <TextInput
                            ref={el => { this.inputRefs.username = el; }}
                            enablesReturnKeyAutomatically
                            returnKeyType="next"
                            enablesReturnKeyAutomatically
                            onSubmitEditing={() => this.inputRefs.code.focus()}
                            value={this.state.code}
                            onChangeText={username => this.setState({ username })}
                            selectionColor={colors.main}
                            style={[globalStyles.input, { marginBottom: 20 }]}
                            autoCorrect={false}
                            placeholder="Username or email"
                        />
                    }
                    <TextInput
                        keyboardType='numeric'
                        ref={el => { this.inputRefs.code = el; }}
                        enablesReturnKeyAutomatically
                        returnKeyType={'done'}
                        enablesReturnKeyAutomatically
                        onSubmitEditing={this.confirmCode}
                        value={this.state.code}
                        onChangeText={code => this.setState({ code })}
                        selectionColor={colors.main}
                        style={[globalStyles.input, { marginBottom: 20 }]}
                        autoCorrect={false}
                        placeholder="Comfirmation Code"
                    />
                </KeyboardAwareScrollView>
                <BottomContainer>
                    <View style={{ height: 15 }} />
                    <Button
                        style={{ marginBottom: 20 }}
                        title="Resend Comfirmation Code"
                        onPress={this.resendCode} />
                    <View style={{ height: 15 }} />
                    <RoundButton
                        title='Confirm Code'
                        style={{ backgroundColor: colors.main }}
                        onPress={this.confirmCode} />
                </BottomContainer>
            </SafeAreaView>
        );
    };
};