import React, { FunctionComponent } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { AppNavigation } from "../../../AppNavigation";
import { AppStore } from "../../../AppStore";
import { Paper } from "../../../components/Surfaces";
import { Typography } from "../../../components/Typography";
import { NavigatedFC } from "../../../helpers/NavigationProps";
import theme from "../../../theme";

const { Title, Paragraph } = Typography;

export interface AuthenticatedScreenProps {

}   

const AuthenticatedScreen: NavigatedFC<AppNavigation, "Authenticated"> = props => {
    const [ account ] = AppStore.account.use();    
    const { navigation} = props;

    const fullName = `${account.user?.firstName} ${account.user?.lastName}`;    

    React.useEffect(() => {
        let timeout = setTimeout(() => {
            if (account.loggedIn)
                navigation.navigate("Home", { })
             else 
                navigation.navigate("Welcome", {});
        }, 1000);

        return () => clearTimeout(timeout);
    }, [ account.loggedIn ]);

    return (
        <Paper align="center">
            <View>
                <View></View>
            </View>
            <ActivityIndicator size="large" style={{ marginBottom: theme.unit * 2 }}/>
            { account.loggedIn ?
                <>
                    <Title align="center" level={2}>Welcome, { fullName }</Title>
                    <Paragraph align="center">Redirecting you to the application...</Paragraph>
                </>
                :
                <>
                    <Title align="center" level={2}>See you later!</Title>
                    <Paragraph align="center">Logging you out...</Paragraph>
                </>
            }
        </Paper>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row"
    },
    
})

export { AuthenticatedScreen }