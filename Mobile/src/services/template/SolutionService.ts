import { AxiosRequestConfig } from "axios";
import { API } from "../../api";
import { ApiClient } from "../../utils/ApiClient";
import { TemplateDTO } from "./models/TemplateDTO";

export class TemplateService {

    public static createTemplate(blueprint: TemplateDTO) {
        const requestConfig: AxiosRequestConfig = {
            method: "PUT",
            url: API.server.template.create,
            data: blueprint
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