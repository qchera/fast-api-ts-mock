import React, { useEffect, useState } from 'react';
import { getShipments, createShipment } from '../services/shipmentService';
import type { Shipment } from '../types';

const ShipmentsPage: React.FC = () => {
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [form, setForm] = useState({ product: '', progress: 'placed', estimated_delivery: '' });

    const fetchList = async () => {
        try {
            const data = await getShipments();
            setShipments(data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    const clearForm = () => {
        setForm({ product: '', progress: 'placed', estimated_delivery: '' });
    }

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...form,
            estimated_delivery: form.estimated_delivery == '' ? null : form.estimated_delivery,
        }
        await createShipment(payload);
        clearForm();
        fetchList(); // Refresh list
    };

    return (
        <div className="page-container">
            <header className="page-header">
                <h1>Shipment Management</h1>
            </header>

            <section className="form-section">
                <h3>Create New Shipment</h3>
                <form onSubmit={handleCreate} className="inline-form">
                    <input
                        placeholder="Product Name"
                        value={form.product}
                        onChange={e => setForm({...form, product: e.target.value})}
                    />
                    <select
                        value={form.progress}
                        onChange={e => setForm({...form, progress: e.target.value})}
                    >
                        <option value="placed">Placed</option>
                        <option value="in transit">In Transit</option>
                        <option value="shipped">Shipped</option>
                    </select>
                    <input
                        type="datetime-local"
                        value={form.estimated_delivery}
                        onChange={e => setForm({...form, estimated_delivery: e.target.value})}
                    />
                    <button type="submit">Create</button>
                </form>
            </section>

            <section className="table-section">
                <table className="data-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Progress</th>
                        <th>Estimated delivery</th>
                    </tr>
                    </thead>
                    <tbody>
                    {shipments.map((s) => (
                        <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.product}</td>
                            <td>
                                <span className={`status-badge ${s.progress.replace(' ', '-')}`}>{s.progress}</span>
                            </td>
                            <td>{s.estimated_delivery}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default ShipmentsPage;