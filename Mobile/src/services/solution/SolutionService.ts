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

    public static deleteSolution(id: string) {
        const requestConfig: AxiosRequestConfig = {
            method: "DELETE",
            url: API.server.solution.delete.replace("%id", id),
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

    public static getSolution(id: string) {
        console.log("ID: " +  id)
        const requestConfig: AxiosRequestConfig = {
            method: "GET",
            url: API.server.solution.getOneById.replace('%id', id)
        };

       return ApiClient.request(requestConfig)
    }

    public static getSolutionByName(name: string) {
        const requestConfig: AxiosRequestConfig = {
            method: "GET",
            url: API.server.solution.getOneByName.replace('%name', name)
        };

       return ApiClient.request(requestConfig)
    }
}