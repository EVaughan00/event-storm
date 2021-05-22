import { AxiosRequestConfig } from "axios";
import { API } from "../../api";
import { ApiClient } from "../../utils/ApiClient";
import { SolutionBlueprint } from "./models/SolutionBlueprint";

export class AccountService {

    public static createSolution(blueprint: SolutionBlueprint) {
        const requestConfig: AxiosRequestConfig = {
            method: "PUT",
            url: API.server.account.register,
            data: blueprint
        };

        return ApiClient.request(requestConfig)
    }
}