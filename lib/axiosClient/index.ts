import axios, { AxiosError } from "axios";
import axiosConfig from "./config";
import { toast } from "react-toastify";
const Cookies = require("js-cookie");

const client = axios.create(axiosConfig);

client.interceptors.request.use(
    async (config) => {
        if (config.url) {
            if (
                config.url.includes("/user") ||
                config.url.includes("/order") ||
                config.url.includes("/auth/logout") ||
                config.url.includes("/payment/checkout/momo") ||
                config.url.includes("/payment/checkout/paypal") ||
                config.url.includes("/payment/return/paypal") ||
                config.url.includes("/order-detail/search") ||
                config.url.includes("/order/search")
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
                    .catch((err) => {
                        toast.error(err.response.data.message, {
                            position: "bottom-right",
                            autoClose: 3000,
                        });
                    });
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
