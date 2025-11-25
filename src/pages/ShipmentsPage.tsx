import React, { useState } from 'react';
import { createShipment } from '../services/shipmentService';
import type { ProgressStatus, ShipmentCreateSimple, ShipmentSummary} from '../types';
import {formatDate} from "../utils/dateUtils.ts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useDispatch, useSelector} from "react-redux";
import {setError} from "../redux/slices/errorSlice.ts";
import {addSale} from "../redux/slices/userSlice.ts";
import {selectAllShipments, selectUsername} from "../redux/store.ts";

const ShipmentsPage: React.FC = () => {
    const [form, setForm] = useState<ShipmentCreateSimple>({
        product: '',
        progress: 'placed',
        estimatedDelivery: '',
        buyerUsername: '',
    });
    const dispatch = useDispatch();
    const currentUsername = useSelector(selectUsername);
    const myShipments: ShipmentSummary[] = useSelector(selectAllShipments)

    const clearForm = () => {
        setForm({ product: '', progress: 'placed', estimatedDelivery: '', buyerUsername: '' });
    }

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.product) {
            dispatch(setError("Product can't be empty"))
            return;
        }
        if (!form.buyerUsername) {
            dispatch(setError("Buyer can't be empty"))
            return;
        }
        else if (form.buyerUsername === currentUsername) {
            dispatch(setError("Buyer username cannot be the same as the current user's username."));
            return;
        }
        const payload = {
            ...form,
            estimatedDelivery: form.estimatedDelivery === '' ? null : form.estimatedDelivery,
        };
        const shipment: ShipmentSummary = await createShipment(payload);
        dispatch(addSale(shipment))
        clearForm();
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
                            selected={form.estimatedDelivery ? new Date(form.estimatedDelivery) : null}
                            onChange={(date: Date | null) => {
                                setForm({
                                    ...form,
                                    estimatedDelivery: date ? date.toISOString() : ''
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
                        value={form.buyerUsername}
                        onChange={e => setForm({ ...form, buyerUsername: e.target.value })}
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
                    {myShipments.sort((s1, s2) => {
                        return new Date(s1.estimatedDelivery).getTime() - new Date(s2.estimatedDelivery).getTime();
                    }).map((s) => (
                        <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.product}</td>
                            <td>
                                <span className={`status-badge ${s.progress.replace(' ', '-')}`}>
                                    {s.progress}
                                </span>
                            </td>
                            <td>{formatDate(s.estimatedDelivery)}</td>
                            <td>{s.buyerUsername}</td>
                            <td>{s.sellerUsername}</td>
                            <td>
                                <span className={`approval-badge ${s.approvalStatus}`}>
                                    {s.approvalStatus}
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