import { AxiosRequestConfig } from "axios";
import { API } from "../../api";
import { ApiClient } from "../../utils/ApiClient";
import { PasswordResetCode } from "./models/PasswordResetCode";
import { PasswordResetRequest } from "./models/PasswordResetRequest";
import { PasswordUpdate } from "./models/PasswordUpdate";

export class PasswordService { 
    public static updatePassword(update: PasswordUpdate) {
        const requestConfig: AxiosRequestConfig = {
            method: "POST",
            url: API.server.password.update,
            data: update
        };

        return ApiClient.request(requestConfig)
    }

    public static requestPasswordReset(request: PasswordResetRequest) {
        const requestConfig: AxiosRequestConfig = {
            method: "POST",
            url: API.server.password.requestReset,
            data: request
        };

        return ApiClient.request(requestConfig)
    }

    public static verifyPasswordReset(reset: PasswordResetCode) {
        const requestConfig: AxiosRequestConfig = {
            method: "POST",
            url: API.server.password.verifyReset,
            data: reset
        };

        return ApiClient.request(requestConfig)
    }
}