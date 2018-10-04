import React from 'react';
import { TextInput, View, SafeAreaView, Text, Image, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { globalStyles, colors } from 'src/global/styles';
import logo from 'checkr-student/logo.png';
export default class extends React.Component {
    static navigationOptions = { header: null }
    async componentDidMount() {
        let currentUser = null;
                try {
                    currentUser = await Auth.currentUserInfo();
                } catch (e) {
                    console.log('[Splashscreen.js]', e)
                } finally {
                    await this.props.navigation.navigate(currentUser ? 'Application' : 'Authenticator');
                }
    };
    render() {
        return (
            <View style={[globalStyles.container, { backgroundColor: colors.main }]}>
                <View style={styles.imageContainer} >
                    <Image
                        source={logo}
                        style={styles.image}
                    />
                </View>
                <Text
                    style={[globalStyles.subtitleBlack, {
                        color: 'white',
                        width: '80%',
                        textAlign: 'center'
                    }]}>
                    A new way to Check
                </Text>
            </View>
        );
    };
};
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    imageContainer: {
        borderRadius: 5,
        width: '60%',
        aspectRatio: 1,
        marginBottom: 40,
        shadowColor: 'white',
        shadowOpacity: 1,
        shadowRadius: 32
    }
});