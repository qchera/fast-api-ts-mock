export type ProgressStatus = 'placed' | 'in transit' | 'shipped';
export type ApprovalStatus = 'accepted' | 'pending' | 'rejected';

export interface User {
    id?: string;
    email: string;
    username: string;
    fullName: string;
    purchases?: ShipmentSummary[];
    sales?: ShipmentSummary[];
}

export interface UserPlain {
    email: string;
    username: string;
    fullName: string;
}

export interface Shipment {
    id?: string;
    product: string;
    progress: ProgressStatus;
    estimatedDelivery?: string | null;
    buyer?: User;
    seller?: User;
    approvalStatus: ApprovalStatus;
}

export interface ShipmentCreateSimple {
    product: string;
    progress: ProgressStatus;
    estimatedDelivery?: string | null;
    buyerUsername: string;
}

export interface ShipmentSummary {
    id: string | null;
    product: string;
    progress: ProgressStatus;
    estimatedDelivery: string;
    buyerUsername: string;
    sellerUsername: string;
    approvalStatus: ApprovalStatus;
}

export interface ErrorData {
    message: string | null;
    code: string | null;
    meta: any;
}
