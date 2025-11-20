import client from '../api/client';

export const login = async (username: string, password: string): Promise<string> => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await client.post<string>('/token', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return response.data;
};

export const logoutApi = async () => {
    await client.get('/logout');
};