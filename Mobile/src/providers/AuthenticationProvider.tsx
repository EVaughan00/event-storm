import { UserDetails } from "../services/account/models/UserDetails";
import React, { FunctionComponent } from "react"; 
import { AppStore } from "../AppStore";
import { AccountService } from "../services/account/AccountService";
import { ApiClient } from "../utils/ApiClient";
import { SessionService } from "../services/account/SessionService";
import * as SecureStore from "expo-secure-store";
import { API } from "../api";

interface Props {
    bypass?: UserDetails
}

const initialContext = {
    authenticated: false,
    logout: () => new Promise(r => r(true)),
    updateSession: (session: string) => {}
}

const AuthenticationContext = React.createContext(initialContext);

const AuthenticationProvider: FunctionComponent<Props> = props => {
    const [ acct, accountActions ] = AppStore.account.use();    

    const handleSessionToken = (token: string) => {
        ApiClient.addAuthentication(token);

        if (!token) {
            SecureStore.deleteItemAsync(API.local.session);
            return handleLogout();
        }

        SecureStore.setItemAsync(API.local.session, token);
        handleLogin();
    }

    const handleLogin = () => {     
        AccountService.getUserDetails()
            .then(user => {
                console.log(`Authenticated user: ${user.email}`);             
                return user;
            })
            .then(accountActions.login)
            .catch(handleLogout)
            .finally(() => setAuthContext({ ...authContext, authenticated: true }));
    }

    const handleLogout = () => {
        SessionService.deleteSessionToken();

        return AccountService.logoutUser()
            .catch(() => {})
            .finally(() => {
                accountActions.logout();
                setAuthContext({ ...authContext, authenticated: false });
            });
    }
    
    const [ authContext, setAuthContext ] = React.useState({
        authenticated: false,
        logout: handleLogout,
        updateSession: handleSessionToken
    });

    React.useEffect(() => {
        if (props.bypass) {
            accountActions.login(props.bypass);
            setAuthContext({ ...authContext, authenticated: true });
            return;
        }

        SecureStore.getItemAsync(API.local.session)
            .then(token => handleSessionToken(token ?? ""));
    }, [])

    return (
        <AuthenticationContext.Provider value={authContext}>
            { props.children }
        </AuthenticationContext.Provider>
    )
}

export { AuthenticationProvider, AuthenticationContext }