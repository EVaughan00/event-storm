import React, { FunctionComponent } from "react";
import { API } from "../api";
import { ApiClient } from "../utils/ApiClient";
import { WebSocketService } from "../utils/WebSocketService";
import { AuthenticationContext } from "./AuthenticationProvider";

const service = new WebSocketService({
    notifications: API.webSockets.notifications
});

const initialContext = {
    service, 
    connected: false
};

export const WebSocketContext = React.createContext(initialContext);

interface Props {
    bypass?: boolean
}

const WebSocketProvider: FunctionComponent<Props> = props => {
    const [ socketContext, setSocketContext ] = React.useState(initialContext);
    const authContext = React.useContext(AuthenticationContext);
    const { notifications  } = socketContext.service.connections;
    
    React.useEffect(() => {
        if (props.bypass)   
            return setSocketContext({ service, connected: true });

        // if (!authContext.authenticated)
        //     return;

        service.connect().then(() => {            
            notifications.invoke("identify", ApiClient.instanceId);
            notifications.on("sessionToken", authContext.updateSession);
            setSocketContext({ connected: true, service })
        });
    }, [ ]);

    return (
        <WebSocketContext.Provider value={socketContext}>
            { props.children }
        </WebSocketContext.Provider>
    );
}

export { WebSocketProvider }