import React, { useEffect, useState } from 'react';
import { getMe } from '../services/userService';
import type {Shipment, User} from '../types';
import {getMyShipments} from "../services/shipmentService.ts";

const DashboardPage: React.FC = () => {
    const [me, setMe] = useState<User | null>(null);
    const [myShipments, setMyShipments] = useState<Shipment[]>([]);

    useEffect(() => {
        getMe().then(setMe).catch(console.error);
        getMyShipments().then(setMyShipments).catch(console.error);
    }, []);

    return (
        <div className="page-container">
            <h1>Dashboard</h1>
            <div className="card">
                <h3>Current Session</h3>
                {me ? (
                    <div>
                        <p><strong>ID:</strong> {me.id}</p>
                        <p><strong>Email:</strong> {me.email}</p>
                        <p><strong>Username:</strong> {me.username}</p>
                        <p><strong>Full name:</strong> {me.full_name}</p>
                        <p>Welcome back to the administration panel.</p>
                    </div>
                ) : (
                    <p>Loading profile...</p>
                )}
            </div>
            <br/>
            <h1>My Shipments</h1>
            <div className="card"></div>
                <section className="table-section">
                    <table className="data-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Progress</th>
                            <th>Estimated Delivery</th>
                            <th>Sent By</th>
                        </tr>
                        </thead>
                        <tbody>
                        {myShipments.map((s) => (
                            <tr key={s.id}>
                                <td>{s.id}</td>
                                <td>{s.product}</td>
                                <td>
                                    <span className={`status-badge ${s.progress.replace(' ', '-')}`}>{s.progress}</span>
                                </td>
                                <td>{s.estimated_delivery}</td>
                                <td>{s.user?.username}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
        </div>
    );
};

export default DashboardPage;