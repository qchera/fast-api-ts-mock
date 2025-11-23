import client from '../api/client';
import type {Shipment, ShipmentSummary, ShipmentCreateSimple, ApprovalStatus} from '../types';

const defaultPath = '/shipments';

export const getShipments = async () => {
    const response = await client.get<ShipmentSummary[]>(defaultPath);
    return response.data;
};

export const getMyShipments = async () => {
    const response = await client.get<ShipmentSummary[]>(`${defaultPath}/my`);
    return response.data;
};

export const createShipment = async (shipment: ShipmentCreateSimple) => {
    const response = await client.post<ShipmentSummary>(defaultPath, shipment);
    return response.data;
};

export const updateApprovalStatus = async (id: string, approval_status: ApprovalStatus) => {
    const response = await client.patch<ShipmentSummary>(`${defaultPath}/${id}/approval`, { approval_status });
    return response.data;
}

export const getShipmentById = async (id: string) => {
    const response = await client.get<Shipment>(`${defaultPath}/${id}`);
    return response.data;
};