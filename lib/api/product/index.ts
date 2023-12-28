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

export type PetSearchType = {
    name: string | null;
    type?: { id: number } | null;
    someStates?: [] | null;
    notInIds?: [] | null;
};
export type AccessorySearchType = {
    name: string | null;
    type?: { id: number } | null;
    someStates?: [] | null;
    notInIds?: [] | null;
};

export async function searchPets(data: PetSearchType) {
    return await client
        .post("/pet/search", {
            search: {
                ...data,
            },
        })
        .then((res) => res.data.data);
}
export async function searchAccessories(data: AccessorySearchType) {
    return await client
        .post("/accessory/search", {
            search: {
                ...data,
            },
        })
        .then((res) => res.data.data);
}

export async function getProductsByIds(data: number[]) {
    return await client
        .post("/pet/search", {
            search: {
                inIds: data,
            },
        })
        .then((res) => res.data.data);
}
