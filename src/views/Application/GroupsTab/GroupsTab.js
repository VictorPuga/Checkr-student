import { createStackNavigator } from 'react-navigation'
import { colors } from 'src/global/styles'

import GroupList from './Screens/GroupList'
import StudentDetail from './Screens/StudentDetail'
import NewGroup from './Screens/NewGroup'

export default createStackNavigator(
    {
        Groups: GroupList,
        StudentDetail: StudentDetail,
        NewGroup: NewGroup
    },
    {
        initialRouteName: 'Groups',
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: colors.main,
            },
            headerTintColor: 'whitesmoke',
            headerTitleStyle: {
                color: 'white',
            },
        }),
    }
);