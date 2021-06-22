import { AxiosRequestConfig } from "axios";
import { API } from "../../api";
import { ApiClient } from "../../utils/ApiClient";
import { TemplateDTO } from "./models/TemplateDTO";

export class TemplateService {

    public static createTemplate(requirements: TemplateDTO) {
        const requestConfig: AxiosRequestConfig = {
            method: "PUT",
            url: API.server.template.create,
            data: requirements
        };

        return ApiClient.request(requestConfig)
    }

    public static getTemplates() {
        const requestConfig: AxiosRequestConfig = {
            method: "GET",
            url: API.server.template.list
        };

       return ApiClient.request(requestConfig)
    }
}