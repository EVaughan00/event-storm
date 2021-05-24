import { ENV } from "./env";

export const API = {
    local: {
        session: "session-token"
    },
    
    webSockets: {
        notifications: `${ENV.connections.api}/notifications`
    },

    server: {
        healthCheck: `${ENV.connections.api}/hc`, // GET

        account: {
            details: `${ENV.connections.api}/account/details`, // GET
            register: `${ENV.connections.api}/account/register`, // PUT
            login: `${ENV.connections.api}/account/login`, // POST
            logout: `${ENV.connections.api}/account/logout`, // GET
            update: `${ENV.connections.api}/account/update`, // POST
            delete: `${ENV.connections.api}/account/delete`, // DELETE
        },

        solution: {
            create: `${ENV.connections.api}/solutions/create`, // PUT
        },

        password: {
            update: `${ENV.connections.api}/password/update`, // POST
            requestReset: `${ENV.connections.api}/password/reset`, // POST
            verifyReset: `${ENV.connections.api}/password/verify`, // POST
        }
    }
}