import { createStackNavigator } from 'react-navigation';
import * as Views from '.';
import { colors } from 'src/global/styles';
const { SignIn, SignUp, ConfirmCode, ForgotPassword } = Views;
export default createStackNavigator(
    {
        SignIn: SignIn,
        SignUp: SignUp,
        ConfirmCode: ConfirmCode,
        ForgotPassword: ForgotPassword
    },
    {
        initialRouteName: 'SignIn',
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: colors.main,
            },
            headerTintColor: 'whitesmoke',
            headerTitleStyle: {
                color: 'white',
            },
        })
    }
);