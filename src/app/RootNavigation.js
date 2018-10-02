import { createSwitchNavigator } from 'react-navigation';
import { Application, Authenticator, SplashScreen } from 'src/views';
const { ApplicationNavigator } = Application;
const { AuthenticatorNavigator } = Authenticator;
export default createSwitchNavigator(
    {
        Application: ApplicationNavigator,
        Authenticator: AuthenticatorNavigator,
        SplashScreen: SplashScreen
    },
    {
        initialRouteName: 'SplashScreen',
        headerMode: 'none',
    }
);