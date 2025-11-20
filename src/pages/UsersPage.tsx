import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/userService';
import type { User } from '../types';

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getUsers().then(setUsers).catch(console.error);
    }, []);

    return (
        <div className="page-container">
            <h1>Users Registry</h1>
            <table className="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Active</th>
                    <th>Superuser</th>
                </tr>
                </thead>
                <tbody>
                {users.map((u) => (
                    <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.email}</td>
                        <td>{u.full_name}</td>
                        <td>{u.username}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersPage;