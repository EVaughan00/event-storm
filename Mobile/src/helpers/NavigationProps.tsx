import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { FunctionComponent } from 'react';

type NavigationStack = {
    [ route: string]: any
};

type ScreenRoute<Stack extends NavigationStack, Screen extends string> = RouteProp<Stack, Screen>;
type ScreenNavigation<Stack extends NavigationStack, Screen extends string> = StackNavigationProp<Stack, Screen>;

export type NavigationProps<Stack extends NavigationStack, Screen extends string> = {
    route: ScreenRoute<Stack, Screen>,
    navigation: ScreenNavigation<Stack, Screen>
}

export type NavigatedFC<Stack extends NavigationStack, Screen extends string> = FunctionComponent<NavigationProps<Stack, Screen>>;