import { AxiosRequestConfig } from "axios";
import { API } from "../../api";
import { ApiClient } from "../../utils/ApiClient";
import { EventBlockDTO } from "./models/EventBlockDTO";

export class EventStormService {

    public static createEventBlock(blueprint: EventBlockDTO) {
        const requestConfig: AxiosRequestConfig = {
            method: "PUT",
            url: API.server.eventStorm.createBlock,
            data: blueprint
        };

        return ApiClient.request(requestConfig)
    }

    public static getBySolution(solutionId: string) {
        const requestConfig: AxiosRequestConfig = {
            method: "GET",
            url: API.server.eventStorm.getBySolution.replace('%solutionid', solutionId)
        };

       return ApiClient.request(requestConfig)
    }

    public static getBlockById(id: string) {
        const requestConfig: AxiosRequestConfig = {
            method: "GET",
            url: API.server.eventStorm.getBlockById.replace('%id', id)
        };

       return ApiClient.request(requestConfig)
    }
}