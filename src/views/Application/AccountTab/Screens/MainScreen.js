import React from 'react';
import { View, Button, StyleSheet, SectionList, Text, Alert } from 'react-native';
import { SettingsCell, SectionHeader, TitleCell, DetailCell, LoadingHUD } from 'src/global/UI';
import { Auth } from 'aws-amplify';
import { globalStyles, colors } from 'src/global/styles';
import { stringToPascalCase } from 'src/global/utilities';
export default class Main extends React.Component {
    state = {
        sections: [
            { data: ['Payment'] },
            { data: ['Privacy'] },
            { data: ['Contact the developers'] },
            { data: ['Log out'] },
        ],
        name: 'Your',
        family_name: 'Name',
        loading: false,
    }
    async componentDidMount() { this.fetchData() };
    static navigationOptions = { title: 'Account' };
    renderHeader = () =>
        <View>
            <SectionHeader />
            <TitleCell
                title={this.state.name + ' ' + this.state.family_name}
                onPress={() => this.goToSetting('Profile')} />
            <SectionHeader />
        </View>;
    renderItemCells = (item, index, section, screen) => {
        if (item === 'Log out') {
            return <DetailCell
                main="Log out"
                mainStyle={{ color: colors.red }}
                onPress={() => {
                    Alert.alert('Sign Out', 'Are you sure you wish to sign out from this account?', [
                        {
                            text: 'Continue', onPress: () => {
                                Auth.signOut()
                                    .then(data => {
                                        this.props.navigation.navigate('SplashScreen')
                                    })
                                    .catch(e => {
                                        console.log('[Sign Out]', e);
                                        Alert.alert('Ooops!', e.message + ' \n Please try again.')
                                    });
                            }
                        },
                        {
                            text: 'Cancel', style: 'cancel'
                        }
                    ])
                }
                } />
        }
        return <SettingsCell
            key={index}
            main={item}
            onPress={() => this.goToSetting(stringToPascalCase(item))} />
    }
    fetchData = async () => {
        this.setState({ loading: true });
        let user = null;
        try {
            user = await Auth.currentUserInfo();
        } catch (e) {
            console.log('[Account Tab]', e);
            Alert.alert("Ooops!", "There has been an error fetching your account's data", [
                { text: 'Go Back', onPress: () => this.props.navigation.navigate('SplashScreen') }
            ]);
        } finally {
            if (user && user.attributes) {
                const { name, family_name } = user.attributes;
                this.setState({ name, family_name });
            } else {
                Alert.alert('Ooops!', 'Your account data was not successfully retrieved \n Procede with your normal use but consider most functionality requieres internet connection');
            };
            this.setState({ loading: false });
        }
    };
    goToSetting = (setting) => this.props.navigation.navigate(setting);
    render() {
        return (
            <View style={globalStyles.container}>
                <SectionList
                    style={styles.list}
                    stickySectionHeadersEnabled={false}
                    ItemSeparatorComponent={() => <View style={globalStyles.separator} />}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    refreshing={this.state.loading}
                    onRefresh={this.fetchData}
                    keyExtractor={(item, index) => item + index}
                    sections={this.state.sections}
                    renderItem={({ item, index, section }) => this.renderItemCells(item, index, section)}
                    renderSectionHeader={
                        ({ section: { title } }) => (
                            <SectionHeader text={title} />
                        )}
                />
            </View>
        );
    };
};
const styles = StyleSheet.create({
    header: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        width: '100%',
        backgroundColor: '#EFEFF4'
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    separator: {
        height: 0.5,
        width: "100%",
        backgroundColor: "#F0F0F1",
    },
    text: {
        fontSize: 20,
        marginHorizontal: 10,
        marginTop: 10,
    }
});