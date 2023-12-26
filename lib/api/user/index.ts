import client from "@/lib/axiosClient";

export async function getUserById(id?: number) {
    return await client.get(`/user/${id}`).then((res) => res.data.data);
}

export async function updateUserById(id: number, update: object) {
    return await client
        .put("/user/update", { update: { ...update, id } })
        .then((res) => res.data);
}
