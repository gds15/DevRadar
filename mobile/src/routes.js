import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//importando as paginas da nossa aplicação
import Main from './pages/Main';
import Profile from './pages/Profile';

//passar as rotas da nossa aplicação
const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'DevRadar'
            },
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no Github'
            },
        },
    }, {
        defaultNavigationOptions: {
            headerTintColor: '#fff',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: '#7d40e7'
            },
        },
    })
);

export default Routes;