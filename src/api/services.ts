import api from './axios';
import type {User, Shipment, ShipmentCreate, AuthResponse, UserRegister} from '../types';

export const authService = {
    login: async (username: string, password: string) => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        return api.post<AuthResponse>('/token', formData);
    },
    register: async (data: UserRegister) => api.post('/signup', data),
    logout: async () => api.get('/logout'),
    me: async () => api.get<User>('/decode'),
};

export const shipmentService = {
    getAllMy: async () => api.get<Shipment[]>('/shipments/my'),
    getById: async (id: string) => api.get<Shipment>(`/shipments/${id}`),
    create: async (data: ShipmentCreate) => api.post<Shipment>('/shipments/', data),
    fillTable: async () => api.post('/shipments/fill'),
    delete: async (id: string) => api.delete(`/shipments/${id}`),
};