import client from "@lib/axiosClient";

export const getExampleApi = async function (url: string) {
    return await client.get(url ?? "/api/hello");
};
