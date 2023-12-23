import client from "@/lib/axiosClient";

type accountRegisterData = {
    register: {
        email: string;
        password: string;
    };
};

type accountLoginData = {
    login: {
        email: string;
        password: string;
    };
};

export async function accountRegister(user: accountRegisterData) {
    return await client.post("/auth/register", user).then((res) => res.data);
}

export async function accountLogin(user: accountLoginData) {
    return await client.post("/auth/login", user).then((res) => res.data);
}

export async function accountLoginWithGoogle(code: string) {
    return await client
        .post("/auth/signin/google", {}, { headers: { ["auth-code"]: code } })
        .then((res) => res.data);
}

export async function refreshToken(refreshToken: string) {
    return await client
        .post("auth/refresh-token", { refreshToken: refreshToken })
        .then((res) => res.data);
}

export async function googleLogin() {
    return await client.get("/auth/signin/google").then((res) => res.data);
}

export async function accountLogout() {
    return await client.delete("/auth/logout").then((res) => res.data);
}
