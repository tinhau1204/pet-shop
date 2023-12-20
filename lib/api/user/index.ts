import client from "@/lib/axiosClient";

export async function getUserById(id?: number) {
    return await client.get(`/user/${id}`).then((res) => res.data.data);
}
