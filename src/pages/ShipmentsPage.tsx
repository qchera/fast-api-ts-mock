import React, { useEffect, useState } from 'react';
import { getShipments, createShipment } from '../services/shipmentService';
import type { ProgressStatus, ShipmentCreateSimple, ShipmentSummary} from '../types';
import {formatDate} from "../utils/dateUtils.ts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useDispatch, useSelector} from "react-redux";
import {setError} from "../redux/slices/errorSlice.ts";
import {addSale} from "../redux/slices/userSlice.ts";

const ShipmentsPage: React.FC = () => {
    const [allShipments, setAllShipments] = useState<ShipmentSummary[]>([]);
    const [form, setForm] = useState<ShipmentCreateSimple>({
        product: '',
        progress: 'placed',
        estimated_delivery: '',
        buyer_username: '',
    });
    const currentUsername = useSelector((state: any) => state.user.userData?.username);
    const dispatch = useDispatch();

    const fetchList = async () => {
        try {
            await getShipments().then(setAllShipments).catch(console.error);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        (async () => {
            await fetchList();
        })();
    }, []);

    const clearForm = () => {
        setForm({ product: '', progress: 'placed', estimated_delivery: '', buyer_username: '' });
    }

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.product) {
            dispatch(setError("Product can't be empty"))
            return;
        }
        if (!form.buyer_username) {
            dispatch(setError("Buyer can't be empty"))
            return;
        }
        else if (form.buyer_username === currentUsername) {
            dispatch(setError("Buyer username cannot be the same as the current user's username."));
            return;
        }
        const payload = {
            ...form,
            estimated_delivery: form.estimated_delivery === '' ? null : form.estimated_delivery,
        };
        const shipment: ShipmentSummary = await createShipment(payload);
        dispatch(addSale(shipment))
        clearForm();
        await fetchList();
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
                        onChange={e => setForm({ ...form, product: e.target.value })}
                    />
                    <select
                        value={form.progress}
                        onChange={e => setForm({ ...form, progress: e.target.value as ProgressStatus })}
                    >
                        <option value="placed">Placed</option>
                        <option value="in transit">In Transit</option>
                        <option value="shipped">Shipped</option>
                    </select>
                    <div className="custom-datepicker-wrapper">
                        <DatePicker
                            selected={form.estimated_delivery ? new Date(form.estimated_delivery) : null}
                            onChange={(date: Date | null) => {
                                setForm({
                                    ...form,
                                    estimated_delivery: date ? date.toISOString() : ''
                                });
                            }}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={30}
                            dateFormat="dd-MM-yyyy HH:mm"
                            timeCaption="Time"
                            placeholderText="Choose estimated delivery"
                            className="react-datepicker-ignore-onclickoutside"
                        />
                    </div>
                    <input
                        placeholder="Buyer Username"
                        value={form.buyer_username}
                        onChange={e => setForm({ ...form, buyer_username: e.target.value })}
                    />
                    <button type="submit">Create</button>
                </form>
            </section>
            <br/>
            <section className="table-section">
                <table className="data-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Progress</th>
                        <th>Estimated Delivery</th>
                        <th>Buyer</th>
                        <th>Seller</th>
                        <th>Approval Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {allShipments.map((s) => (
                        <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.product}</td>
                            <td>
                                <span className={`status-badge ${s.progress.replace(' ', '-')}`}>
                                    {s.progress}
                                </span>
                            </td>
                            <td>{formatDate(s.estimated_delivery)}</td>
                            <td>{s.buyer_username}</td>
                            <td>{s.seller_username}</td>
                            <td>
                                <span className={`approval-badge ${s.approval_status}`}>
                                    {s.approval_status}
                                </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default ShipmentsPage;