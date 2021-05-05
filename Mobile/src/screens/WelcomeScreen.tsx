import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import assets from '../../assets';
import { AppNavigation } from '../AppNavigation';
import { LoginForm } from '../areas/account/forms/LoginForm';
import { CustomButton, Link } from '../components/CustomButton';
import { Popup } from '../components/Popup';
import { Paper } from '../components/Surfaces';
import { Typography } from '../components/Typography';
import { ENV } from '../env';
import { NavigatedFC } from '../helpers/NavigationProps';
import { AuthenticationContext } from '../providers/AuthenticationProvider';
import theme from '../theme';
import { StringUtils } from '../utils/StringUtils';

const { Title, Paragraph } = Typography;

export interface WelcomeScreenProps {}

const WelcomeScreen: NavigatedFC<AppNavigation, "Welcome"> = props => {
    const [ loggingIn, viewLoginForm ] = React.useState(false);       
    const authContext = React.useContext(AuthenticationContext);
    const { route, navigation } = props;     

    React.useEffect(() => {
        if (authContext.authenticated)
            navigation.navigate("Authenticated", {});

    }, [authContext.authenticated])

    const toRegistration = () => navigation.navigate("Register", {});
    
    return (
        <Paper align="center">
            <View style={ styles.container }>
                <Image style={styles.image} source={assets.welcome} />
                <Title level={1} align="center">{ ENV.appName }</Title>
                <Paragraph align="center">{ StringUtils.lorem(200) }</Paragraph>
            </View>
            <CustomButton size="large" ripple onPress={() => viewLoginForm(true)}>Get Started</CustomButton>
            <Link align="center" style={styles.link} onClick={toRegistration}>Register for a new account</Link>
            
            <Popup title={`Sign in to ${ENV.appName}`} 
                visible={loggingIn} 
                onClose={() => viewLoginForm(false)}>
                <LoginForm onFinish={() => viewLoginForm(false)} />
            </Popup>
        </Paper>
    )
}

const styles = StyleSheet.create({ 
    container: {
        marginBottom: 32,
    },
    link: {
        marginTop: theme.unit * 2,
    },
    image: {
        width: "100%",
        height: 300,
        marginTop: theme.unit * 2,
        marginBottom: theme.unit * 4
    },
});

export { WelcomeScreen };

