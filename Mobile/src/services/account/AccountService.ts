import { AxiosRequestConfig } from "axios";
import { API } from "../../api";
import { ApiClient } from "../../utils/ApiClient";
import { Login } from "./models/Login";
import { Registration } from "./models/Registration";
import { UserDetails } from "./models/UserDetails";

export class AccountService {
    public static getUserDetails() {
        const requestConfig: AxiosRequestConfig = {
            method: "GET",
            url: API.server.account.details
        };

        return ApiClient.request(requestConfig)
            .then(response => new UserDetails().copy(response.model))
    }

    public static registerUser(registration: Registration) {
        const requestConfig: AxiosRequestConfig = {
            method: "PUT",
            url: API.server.account.register,
            data: registration
        };

        return ApiClient.request(requestConfig)
    }

    public static loginUser(login: Login) {
        const requestConfig: AxiosRequestConfig = {
            method: "POST",
            url: API.server.account.login,
            data: login
        };

        return ApiClient.request(requestConfig)
    }

    public static logoutUser() {
        const requestConfig: AxiosRequestConfig = {
            method: "GET",
            url: API.server.account.logout
        };

        return ApiClient.request(requestConfig)
    }

    public static updateUserDetails(update: UserDetails) {
        const requestConfig: AxiosRequestConfig = {
            method: "POST",
            url: API.server.account.update,
            data: update
        };

        return ApiClient.request(requestConfig)
    }

    public static deleteAccount() {
        const requestConfig: AxiosRequestConfig = {
            method: "DELETE",
            url: API.server.account.delete
        };

        return ApiClient.request(requestConfig);
    }
}