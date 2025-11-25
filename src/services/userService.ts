import client from '../api/client';
import type { User } from '../types';

interface UserCreate {
    email: string;
    password: string;
    username: string;
    fullName: string;
}

export const createUser = async (userData: UserCreate) => {
    const response = await client.post('/signup', userData);
    return response.data;
};

export const getMe = async () => {
    const response = await client.get<User>('/decode');
    return response.data;
};

export const getUsers = async () => {
    const response = await client.get<User[]>('/users/');
    return response.data;
};