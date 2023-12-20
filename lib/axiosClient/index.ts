import axios, { AxiosError } from "axios";
import axiosConfig from "./config";
import { useMutation } from "react-query";
import { refreshToken } from "../api";
import { toast } from "react-toastify";
const Cookies = require("js-cookie");

const client = axios.create(axiosConfig);

//xu ly data truoc khi xuong server

let isRefreshing = false;

client.interceptors.request.use(
    async (config) => {
        if (
            config.url &&
            (config.url.indexOf("/auth/register") >= 0 ||
                config.url.indexOf("/auth/login") >= 0 ||
                config.url.indexOf("/accesory/search") >= 0 ||
                config.url.indexOf("/pet/search") >= 0 ||
                config.url.indexOf("/auth/signin/google") >= 0)
        ) {
            return config;
        }

        if (!isRefreshing) {
            isRefreshing = true;
            client.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${Cookies.get("accessToken")}`;
            try {
                const accessTokenResponse = await refreshToken(
                    Cookies.get("refreshToken"),
                );

                if (accessTokenResponse && accessTokenResponse?.data !== null) {
                    client.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${accessTokenResponse.data.access_token}`;
                } else if (
                    accessTokenResponse &&
                    accessTokenResponse?.data == null
                ) {
                    return config;
                }
            } catch (error) {
                // Handle token refresh error, e.g., redirect to login page
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data?.message || error.message);
                }
            } finally {
                isRefreshing = false;
            }
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    },
);

export default client;
