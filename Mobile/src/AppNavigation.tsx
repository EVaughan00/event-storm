import { createStackNavigator } from '@react-navigation/stack';
import { AuthenticatedScreenProps } from './areas/account/screens/AuthenticatedScreen';
import { RegisterScreenProps } from './areas/account/screens/RegisterScreen';
import { HomeScreenProps } from './areas/home/screens/HomeScreen';
import { SolutionScreenProps } from './areas/solution/screens/SolutionScreen';
import { WelcomeScreenProps } from './screens/WelcomeScreen';

type AppNavigation = {
    Home: HomeScreenProps,
    Welcome: WelcomeScreenProps,
    Register: RegisterScreenProps,
    Authenticated: AuthenticatedScreenProps,
    Solution: SolutionScreenProps
}

const AppStack = createStackNavigator<AppNavigation>();

export { AppNavigation, AppStack };

