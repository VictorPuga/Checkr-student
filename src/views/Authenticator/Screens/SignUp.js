import React from 'react';
import { RoundButton, LoadingHUD, BottomContainer } from 'src/global/UI';
import { TextInput, SafeAreaView, Text, Alert, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Auth } from 'aws-amplify';
import { globalStyles, colors } from 'src/global/styles';
import RNPickerSelect from 'react-native-picker-select';
const pickerStyles = StyleSheet.create({
    inputIOS: {
        height: 30,
        padding: 5,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#9A9A9A',
        marginBottom: 20,
        color: 'black'
    },
});;
export default class extends React.Component {
    state = { loading: false, username: "", password: "", passwordConfirmation: "", name: "", family_name: "", email: "", gender: "" };
    static navigationOptions = ({ navigation }) => ({ title: "Sign Up" });
    inputRefs = {};
    signUp = async () => {
        const { username, password, passwordConfirmation, name, family_name, email, gender } = this.state;
        console.log('signing up')
        this.setState({ loading: true });
        let user = null;
        try {
            if (password && passwordConfirmation && name && family_name && email && gender) {
                if (password === passwordConfirmation) {
                    try {
                        user = await Auth.signUp({
                            username,
                            password,
                            attributes: {
                                name,
                                email,
                                family_name,
                                gender
                            }
                        })
                    }
                    catch (e) {
                        console.log('[SignUp.js]:', e)
                    }
                } else {
                    Alert.alert("Both passwords don't match")
                }
            } else {
                Alert.alert('All fields must be filled in order to continue');
            };
        } catch (e) {
            console.log('[Sign In]', e);
            Alert.alert('Ooops!', e.message + ' \n  Please try again.');
        } finally {
            this.setState({ loading: false });
            if (user && !user.userConfirmed) { this.props.navigation.navigate('ConfirmCode', { username }); };
            if (user && user.userConfirmed) { this.props.navigation.navigate('SplashScreen'); };
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
                        style={[globalStyles.subtitleBlack, { marginBottom: 30 }]}>
                        Please fill the following fields to create your account
                        </Text>
                    <Text>Username</Text>
                    <TextInput
                        autoCapitalize='none'
                        ref={el => this.inputRefs.username = el}
                        returnKeyType="next"
                        enablesReturnKeyAutomatically
                        onSubmitEditing={() => this.inputRefs.email.focus()}
                        // value={this.state.groupId}
                        onChangeText={username => this.setState({ username })}
                        selectionColor={colors.main}
                        style={[globalStyles.input, { marginBottom: 20 }]}
                        autoCorrect={false}
                        placeholder="Username"
                    />
                    <Text>Email</Text>
                    <TextInput
                        keyboardType='email-address'
                        autoCapitalize='none'
                        ref={el => this.inputRefs.email = el}
                        returnKeyType="next"
                        enablesReturnKeyAutomatically
                        onSubmitEditing={() => this.inputRefs.genderPicker.togglePicker()}  // not .focus()
                        // value={this.state.groupId}
                        onChangeText={email => this.setState({ email })}
                        selectionColor={colors.main}
                        style={[globalStyles.input, { marginBottom: 20 }]}
                        autoCorrect={false}
                        placeholder="Email"
                    />
                    <Text>Gender</Text>
                    <RNPickerSelect
                        hideIcon
                        placeholder={{
                            label: 'Gender',
                            value: null,
                        }}
                        items={[
                            { label: 'Female', value: 'female' },
                            { label: 'Male', value: 'male' },
                            { label: 'Other', value: 'other' }
                        ]}
                        onValueChange={(gender) => this.setState({ gender })}
                        onUpArrow={() => { this.inputRefs.email.focus()}}
                        onDownArrow={() => { this.inputRefs.name.focus()}}
                        // style={{ ...pickerStyles }}
                        style={pickerStyles}
                        value={this.state.gender}
                        ref={el => this.inputRefs.genderPicker = el}
                    />
                    <Text>Name</Text>
                    <TextInput
                        autoCapitalize='none'
                        ref={el => this.inputRefs.name = el}
                        returnKeyType="next"
                        enablesReturnKeyAutomatically
                        onSubmitEditing={() => this.inputRefs.family_name.focus()}
                        // value={this.state.groupId}
                        onChangeText={name => this.setState({ name })}
                        selectionColor={colors.main}
                        style={[globalStyles.input, { marginBottom: 20 }]}
                        autoCorrect={false}
                        placeholder="Name"
                    />
                    <Text>Last Name</Text>
                    <TextInput
                        autoCapitalize='none'
                        ref={el => this.inputRefs.family_name = el}
                        returnKeyType="next"
                        enablesReturnKeyAutomatically
                        onSubmitEditing={() => this.inputRefs.password.focus()}
                        // value={this.state.groupId}
                        onChangeText={family_name => this.setState({ family_name })}
                        selectionColor={colors.main}
                        style={[globalStyles.input, { marginBottom: 20 }]}
                        autoCorrect={false}
                        placeholder="Last Name"
                    />
                    <Text>Password</Text>
                    <TextInput
                        autoCapitalize='none'
                        ref={el => this.inputRefs.password = el}
                        secureTextEntry
                        returnKeyType="next"
                        enablesReturnKeyAutomatically
                        onSubmitEditing={() => this.inputRefs.passwordConfirmation.focus()}
                        // value={this.state.groupId}
                        onChangeText={password => this.setState({ password })}
                        selectionColor={colors.main}
                        style={[globalStyles.input, { marginBottom: 20 }]}
                        autoCorrect={false}
                        placeholder="Password"
                    />
                    <Text>Confirm Password</Text>
                    <TextInput
                        autoCapitalize='none'
                        ref={el => { this.inputRefs.passwordConfirmation = el; }}
                        secureTextEntry
                        returnKeyType="done"
                        enablesReturnKeyAutomatically
                        onSubmitEditing={this.signUp}
                        // value={this.state.groupId}
                        onChangeText={passwordConfirmation => this.setState({ passwordConfirmation })}
                        selectionColor={colors.main}
                        style={[globalStyles.input, { marginBottom: 20 }]}
                        autoCorrect={false}
                        placeholder="Confirm Password"
                    />
                </KeyboardAwareScrollView>
                <BottomContainer>
                    <RoundButton
                        style={{ backgroundColor: colors.main }}
                        title="Sign Up"
                        onPress={this.signUp}
                    />
                </BottomContainer>
            </SafeAreaView>
        );
    };
};