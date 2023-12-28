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

export async function getProductsByIds(
    data: { id: string; type: "pet" | "accessory" }[],
) {
    const pets = await client
        .post("/pet/search", {
            search: {
                inSkus: data
                    .filter((item) => item.type === "pet")
                    .map((item) => item.id),
            },
        })
        .then((res) => res.data.data);
    const accessories = await client
        .post("/accessory/search", {
            search: {
                inSkus: data
                    .filter((item) => item.type === "accessory")
                    .map((item) => item.id),
            },
        })
        .then((res) => res.data.data);

    console.log("pets :>> ", pets);
    console.log("accessories :>> ", accessories);

    return [...accessories, ...pets];
}
