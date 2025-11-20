import client from '../api/client';
import type { Shipment } from '../types';

const defaultPath = '/shipments';

export const getShipments = async () => {
    const response = await client.get<Shipment[]>(defaultPath);
    return response.data;
};

export const getMyShipments = async () => {
    const response = await client.get<Shipment[]>(`${defaultPath}/my`);
    return response.data;
};

export const createShipment = async (shipment: Shipment) => {
    const response = await client.post<Shipment>(defaultPath, shipment);
    return response.data;
};

export const getShipmentById = async (id: number) => {
    const response = await client.get<Shipment>(`${defaultPath}/${id}`);
    return response.data;
};