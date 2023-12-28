import axios, { AxiosError } from "axios";
import axiosConfig from "./config";
// import { useMutation } from "react-query";
// import { refreshToken } from "../api";
// import { toast } from "react-toastify";
const Cookies = require("js-cookie");

const client = axios.create(axiosConfig);

//xu ly data truoc khi xuong server

client.interceptors.request.use(
    async (config) => {
        if (config.url) {
            if (
                config.url.includes("/user") ||
                config.url.includes("/order") ||
                config.url.includes("/auth/logout") ||
                config.url.includes("/payment/checkout/momo")
            ) {
                config.headers.set(
                    "Authorization",
                    `Bearer ${Cookies.get("accessToken")}`,
                );
                await client
                    .post("/auth/refresh-token", {
                        refreshToken: Cookies.get("refreshToken"),
                    })
                    .then((res) => {
                        if (res.data.data !== null) {
                            config.headers.set(
                                "Authorization",
                                `Bearer ${res.data.data.access_token}`,
                            );
                            Cookies.set(
                                "accessToken",
                                res.data.data.access_token,
                            );
                        }
                    })
                    .catch((err) => {});
                console.log("config :>> ", config);
            } else {
                if (config.url.includes("/auth/refresh-token")) {
                    config.headers.set(
                        "Authorization",
                        `Bearer ${Cookies.get("accessToken")}`,
                    );
                }
                return config;
            }
        }

        return config;
    },
    (err) => {
        return Promise.reject(err);
    },
);

export default client;
