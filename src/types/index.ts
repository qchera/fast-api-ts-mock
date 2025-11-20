export const ProgressStatus = {
    PLACED: "placed",
    IN_TRANSIT: "in transit",
    SHIPPED: "shipped",
} as const;

export type ProgressStatus = (typeof ProgressStatus)[keyof typeof ProgressStatus];

export interface User {
    id: string;
    username: string;
    full_name: string;
    email: string;
}

export interface Shipment {
    id: string;
    product: string;
    progress: ProgressStatus;
    estimated_delivery: string;
    user_id: string;
}

export interface ShipmentCreate {
    product: string;
    progress?: ProgressStatus;
    estimated_delivery?: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
}

export interface UserRegister {
    username: string;
    full_name: string;
    email: string;
    password: string;
}