import { AxiosRequestConfig } from "axios";
import { API } from "../../api";
import { ApiClient } from "../../utils/ApiClient";
import { SolutionDTO } from "./models/SolutionBlueprint";

export class SolutionService {

    public static createSolution(blueprint: SolutionDTO) {
        const requestConfig: AxiosRequestConfig = {
            method: "PUT",
            url: API.server.solution.create,
            data: blueprint
        };

        return ApiClient.request(requestConfig)
    }
}