export interface User {
    id?: number;
    email: string;
    username: string;
    full_name: string;
}

export interface Shipment {
    id?: number;
    product: string;
    progress: string; // e.g., "placed", "shipped"
    estimated_delivery?: string | null;
    user?: User;
}
