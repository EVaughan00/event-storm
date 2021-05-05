import { ServiceConnection } from "./utils/ServiceConnection";

export enum ApplicationMode {
    Development = "development",
    Production = "production"
}

type Services = "api" | "identity";

const applicationMode = (
    process.env.NODE_ENV == ApplicationMode.Development ? 
        ApplicationMode.Development : 
        ApplicationMode.Production
);

const connections = require("../connections.json")[applicationMode];

export const ENV = {
    mode: applicationMode,
    connections: ServiceConnection.import<Services>(connections),
    titleSuffix: "Event Storm",
    appName: "Event Storm" 
}