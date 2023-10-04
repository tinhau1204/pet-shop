import { API } from "@lib/config/env";
import { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
    baseURL: API,
    timeout: 5000,
    headers: {
        "content-type": "application/json",
    },
    params: {},
};

export default axiosConfig;
