import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/userService';
import type { User } from '../types';

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getUsers().then(setUsers).catch(console.error);
        console.log(users)
    }, []);

    return (
        <div className="page-container">

        </div>
    );
};

export default UsersPage;