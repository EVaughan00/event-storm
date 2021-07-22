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
            create: `${ENV.connections.api}/solution/create`, // PUT
            list: `${ENV.connections.api}/solution/list`, // GET
            getOneById: `${ENV.connections.api}/solution/%id`, // GET
            getOneByName: `${ENV.connections.api}/solution/%name`, // GET
            delete: `${ENV.connections.api}/solution/%id`
        },

        eventStorm: {
            createBlock: `${ENV.connections.api}/event-storm/block/create`, // PUT
            getBySolution: `${ENV.connections.api}/event-storm/%solutionid`, // GET
        },

        template: {
            create: `${ENV.connections.api}/template/create`, // PUT
            list: `${ENV.connections.api}/template/list`, // GET
            getOne: `${ENV.connections.api}/template/%id`, // GET
        },


        password: {
            update: `${ENV.connections.api}/password/update`, // POST
            requestReset: `${ENV.connections.api}/password/reset`, // POST
            verifyReset: `${ENV.connections.api}/password/verify`, // POST
        }
    }
}