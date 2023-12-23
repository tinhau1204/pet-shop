import { API } from "@lib/config/env";
import { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
    baseURL: process.env.NEXT_PUBLIC_API,
    timeout: Infinity,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
    params: {},
};

export default axiosConfig;
