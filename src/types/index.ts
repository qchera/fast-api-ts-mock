export type ProgressStatus = 'placed' | 'in transit' | 'shipped';

export interface User {
    id?: string;
    email: string;
    username: string;
    full_name: string;
    purchases?: ShipmentArrVal[];
    sales?: ShipmentArrVal[];
}

export interface UserPlain {
    email: string;
    username: string;
    full_name: string;
}

export interface Shipment {
    id?: string;
    product: string;
    progress: ProgressStatus;
    estimated_delivery?: string | null;
    buyer?: User;
    seller?: User;
}

export interface ShipmentCreateSimple {
    product: string;
    progress: ProgressStatus;
    estimated_delivery?: string | null;
    buyer_username: string;
}

export interface ShipmentArrVal {
    product: string;
    progress: ProgressStatus;
    estimated_delivery: string | null;
    buyer_username: string;
    seller_username: string;
}
