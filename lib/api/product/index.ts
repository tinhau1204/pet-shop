import client from "@/lib/axiosClient";

export async function getPet() {
    return await client.post("/pet/search").then((res) => res.data?.data);
}

export async function getPetById(id?: number) {
    return await client.get(`/pet/${id}`).then((res) => res.data);
}

export async function getAccessories() {
    return await client.post("/accessory/search").then((res) => res.data?.data);
}

export async function getAccessoriesById(id: number) {
    return await client.get(`/accessory/${id}`).then((res) => res.data);
}

export async function getPetType(data?: any) {
    return await client
        .post("/pet-type/search", data)
        .then((res) => res.data.data);
}

export async function getAccessoriesType(data?: any) {
    return await client
        .post("/accessory-type/search", data)
        .then((res) => res.data.data);
}
