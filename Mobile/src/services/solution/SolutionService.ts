import { AxiosRequestConfig } from "axios";
import { API } from "../../api";
import { ApiClient } from "../../utils/ApiClient";
import { SolutionDTO } from "./models/SolutionDTO";

export class SolutionService {

    public static createSolution(blueprint: SolutionDTO) {
        const requestConfig: AxiosRequestConfig = {
            method: "PUT",
            url: API.server.solution.create,
            data: blueprint
        };

        return ApiClient.request(requestConfig)
    }

    public static getSolutions() {
        const requestConfig: AxiosRequestConfig = {
            method: "GET",
            url: API.server.solution.list
        };

       return ApiClient.request(requestConfig)
    }
}