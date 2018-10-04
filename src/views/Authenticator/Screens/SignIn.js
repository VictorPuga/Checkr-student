import React from 'react';
import { RoundButton, LoadingHUD, BottomContainer } from 'src/global/UI';
import { TextInput, View, SafeAreaView, Text, Alert, Button } from 'react-native';
import { Auth } from 'aws-amplify';
import { globalStyles, colors } from 'src/global/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default class extends React.Component {
    static navigationOptions = ({ navigation }) => ({ title: "Sign In" });
    state = { username: "", password: "", loading: false };
    inputRefs = {};
    signIn = async () => {
        const { username, password } = this.state;
        this.setState({ loading: true });
        let user = null;
        let errorCode = null;
        try {
            if (username && password) {
                user = await Auth.signIn(username, password);
            } else {
                Alert.alert('Both username and password fields must be filled');
            };
        } catch (e) {
            console.log('[Sign In]', e);
            errorCode = e.code;
            errorCode !== 'UserNotConfirmedException' ?
                Alert.alert('Ooops!', e.message + ' \n Please try again.') :
                Alert.alert('Ooops!', e.message + " \n Please procede to confirm your account's email.", [
                    { text: 'Continue', onPress: () => this.props.navigation.navigate('ConfirmCode', { username, password }) },
                    { text: 'Cancel', style: 'cancel' },
                ]);
        } finally {
            this.setState({ loading: false });
            if (user) {
                if (!user.signInUserSession.idToken.payload.email_verified) {
                    Alert.alert("This account's email isn't verified", "This likely ocurred because your email has been used and confirmed for another account. \n This means all email functionality is unavailable for this account, such as email Sign In and changing your password. \n Otherwise, you can use your account normally. \n \n If you don't recall confirming your email into any new Checkr account, consider your email as compromised.", [
                        { text: 'Ok', onPress: () => this.props.navigation.navigate('SplashScreen') },
                    ]);
                } else {
                    this.props.navigation.navigate('SplashScreen'); console.log('no error!')
                };
            };
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
                    extraScrollHeight={100}>
                    <Text
                        style={{ fontSize: 20, marginTop: 20, marginBottom: 20, fontWeight: '600' }}>
                        Enter your username and password below
                    </Text>
                    <TextInput
                        autoCapitalize='none'
                        ref={el => { this.inputRefs.username = el; }}
                        enablesReturnKeyAutomatically
                        returnKeyType="next"
                        onSubmitEditing={() => this.inputRefs.password.focus()}
                        value={this.state.groupId}
                        onChangeText={username => this.setState({ username })}
                        selectionColor={colors.main}
                        style={[globalStyles.input, { marginBottom: 20 }]}
                        autoCorrect={false}
                        placeholder="Username or email"
                    />
                    <TextInput
                        autoCapitalize='none'
                        ref={el => { this.inputRefs.password = el; }}
                        secureTextEntry
                        enablesReturnKeyAutomatically
                        onSubmitEditing={this.signIn}
                        returnKeyType="done"
                        value={this.state.groupId}
                        onChangeText={password => this.setState({ password })}
                        selectionColor={colors.main}
                        style={[globalStyles.input, { marginBottom: 20 }]}
                        autoCorrect={false}
                        placeholder="Password"
                    />
                    <RoundButton
                        style={{ backgroundColor: colors.main }}
                        title="Sign In"
                        onPress={this.signIn}
                    />
                    <View style={{ height: 25 }} />

                    <Button
                        title="Forgot your password?"
                        onPress={() => this.props.navigation.navigate('ForgotPassword')}
                    />
                    <View style={{ height: 5 }} />
                    <Button
                        title="Don't yet have an account?"
                        onPress={() => this.props.navigation.navigate('SignUp')}
                    />
                </KeyboardAwareScrollView>
                <BottomContainer>
                    <View style={{ height: 15 }} />
                </BottomContainer>
            </SafeAreaView>
        );
    };
};