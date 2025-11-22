import client from '../api/client';
import type {Shipment, ShipmentArrVal, ShipmentCreateSimple} from '../types';

const defaultPath = '/shipments';

export const getShipments = async () => {
    const response = await client.get<Shipment[]>(defaultPath);
    return response.data;
};

export const getMyShipments = async () => {
    const response = await client.get<Shipment[]>(`${defaultPath}/my`);
    return response.data;
};

export const createShipment = async (shipment: ShipmentCreateSimple) => {
    const response = await client.post<ShipmentArrVal>(defaultPath, shipment);
    return response.data;
};

export const getShipmentById = async (id: number) => {
    const response = await client.get<Shipment>(`${defaultPath}/${id}`);
    return response.data;
};