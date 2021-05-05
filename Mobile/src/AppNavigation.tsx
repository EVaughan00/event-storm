import { createStackNavigator } from '@react-navigation/stack';
import { AuthenticatedScreenProps } from './areas/account/screens/AuthenticatedScreen';
import { RegisterScreenProps } from './areas/account/screens/RegisterScreen';
import { HomeScreenProps } from './areas/home/screens/HomeScreen';
import { WelcomeScreenProps } from './screens/WelcomeScreen';

type AppNavigation = {
    Home: HomeScreenProps,
    Welcome: WelcomeScreenProps,
    Register: RegisterScreenProps,
    Authenticated: AuthenticatedScreenProps,
}

const AppStack = createStackNavigator<AppNavigation>();

export { AppNavigation, AppStack };

