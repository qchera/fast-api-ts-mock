export type ProgressStatus = 'placed' | 'in transit' | 'shipped';
export type ApprovalStatus = 'accepted' | 'pending' | 'rejected';

export interface User {
    id?: string;
    email: string;
    username: string;
    full_name: string;
    purchases?: ShipmentSummary[];
    sales?: ShipmentSummary[];
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
    approval_status: ApprovalStatus;
}

export interface ShipmentCreateSimple {
    product: string;
    progress: ProgressStatus;
    estimated_delivery?: string | null;
    buyer_username: string;
}

export interface ShipmentSummary {
    id?: string;
    product: string;
    progress: ProgressStatus;
    estimated_delivery: string | null;
    buyer_username: string;
    seller_username: string;
    approval_status: ApprovalStatus;
}
