export interface IUser {
    email: string;
    id: number;
    isAdmin: boolean;
    name: string;
    phone: string;
    username: string;
    avatar_url: string;
    created_at: string;
    verification_token: string;
    is_verified: boolean;
    is_looked: boolean;
    address?: string;
    gender?: string;
}

export type petsData = {
    id: number;
    sku: string;
    name: string;
    stock_quantity: number;
    price: number;
    thumbnail_image: string;
    description_images: string[];
    age: number;
    isMale: boolean;
    color: string;
    weight: number;
    height: number;
    birthday: string;
    origin: string;
    description: string;
    type_id: number;
    state: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    type: {
        id: number;
        name: string;
        parent_id?: number | null;
        state: string;
        created_at: string;
        updated_at: string;
        deleted_at?: string;
    };
};

export type accessoriesData = {
    id: number;
    sku: string;
    name: string;
    stock_quantity: number;
    price: number;
    thumbnail_image: string;
    description_images: string[];
    origin: string;
    description: string;
    weight: number;
    type_id: number;
    state: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    type: {
        id: number;
        name: string;
        parent_id?: number | null;
        state: string;
        created_at: string;
        updated_at: string;
        deleted_at?: string;
    };
};

export type petTypesData = {
    id: number;
    name: string;
    parent_id?: number | null;
    state: "ACTIVE" | "INACTIVE";
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    pets: [
        {
            id: number;
            sku: string;
            name: string;
            stock_quantity: number;
            price: number;
            thumbnail_image: string;
            description_images: string[];
            age: number;
            isMale: boolean;
            color: string;
            weight: number;
            height: number;
            birthday: string;
            origin: string;
            description: string;
            type_id: number;
            state: string;
            created_at: string;
            updated_at: string;
            deleted_at?: string | null;
        }
    ],
    parent?: string | null;
    children?: string[];
}

export type accessoriesTypesData = {
    id: number;
    name: string;
    parent_id?: number | null;
    state: "ACTIVE" | "INACTIVE";
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    accessories: [
        {
            id: number;
            sku: string;
            name: string;
            stock_quantity: number;
            price: number;
            thumbnail_image: string;
            description_images: string[];
            origin: string;
            description: string;
            weight: number;
            type_id: number;
            state: string;
            created_at: string;
            updated_at: string;
            deleted_at?: string;
        }
    ]
    parent?: string | null;
    children?: string[];
}

export interface GenericResponse {
    status: string;
    message: string;
}

export interface ILoginResponse {
    status: string;
    access_token: string;
}

export interface IUserResponse {
    status: string;
    data: {
        user: IUser;
    };
}
