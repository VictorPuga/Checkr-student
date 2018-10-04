import { createStackNavigator } from 'react-navigation';
import { colors } from 'src/global/styles';
import MainScreen from './Screens/MainScreen';
import Privacy from './Screens/Privacy';
import Profile from './Screens/Profile';

export default createStackNavigator(
    {
        Main: MainScreen,
        Privacy: Privacy,
        Profile: Profile,
    },
    {
        initialRouteName: 'Main',
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: colors.main,
            },
            headerTintColor: 'whitesmoke',
            headerTitleStyle: {
                color: 'white',
            }
        }),
    }
);