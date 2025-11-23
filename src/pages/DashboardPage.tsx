import type {ApprovalStatus, ShipmentSummary, User} from '../types';
import {formatDate} from "../utils/dateUtils";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import ApprovalActions from "../components/ApprovalActions.tsx";
import {updateApprovalStatus} from "../services/shipmentService.ts";
import {updatePurchase} from "../redux/slices/userSlice.ts";

const DashboardPage: React.FC = () => {
    const me: User | null = useSelector((state: any) => state.user.userData);
    const dispatch = useDispatch()

    const handleApprovalAction = async (id: string, status: ApprovalStatus) => {
        const shipment: ShipmentSummary = await updateApprovalStatus(id, status)
        dispatch(updatePurchase(shipment))
    }

    const renderApprovalColumn = (s: ShipmentSummary) => {
        return (
            <div className="approval-cell-content">
                <span className={`approval-badge ${s.approval_status}`}>
                    {s.approval_status}
                </span>

                {s.approval_status === 'pending' && (
                    <div className="approval-actions-wrapper">
                        <ApprovalActions
                            id={s.id || ''}
                            onAction={handleApprovalAction}
                        />
                    </div>
                )}
            </div>
        );
    };

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
                        <p>Welcome back to the administration panel!</p>
                    </div>
                ) : (
                    <p>Loading profile...</p>
                )}
            </div>
            <br/>
            <h2>My Purchases</h2>
            {me?.purchases ? (
                <div className="card">
                    <section className="table-section">
                        <table className="data-table">
                            <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Progress</th>
                                <th>Estimated Delivery</th>
                                <th>Seller's Username</th>
                                <th>Approval Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {me.purchases.map((s) => (
                                <tr key={s.product + s.estimated_delivery}>
                                    <td>{s.product}</td>
                                    <td>
                                        <span className={`status-badge ${s.progress.replace(' ', '-')}`}>
                                            {s.progress}
                                        </span>
                                    </td>
                                    <td>{formatDate(s.estimated_delivery)}</td>
                                    <td>{s.seller_username}</td>
                                    <td>
                                        {renderApprovalColumn(s)}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </section>
                </div>
            ) : (
                <div className="card">
                    <p>No shipments found.</p>
                </div>
            )}
            <h2>My Sales</h2>
            {me?.sales ? (
                <div className="card">
                    <section className="table-section">
                        <table className="data-table">
                            <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Progress</th>
                                <th>Estimated Delivery</th>
                                <th>Buyer's Username</th>
                                <th>Approval Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {me.sales.map((s) => (
                                <tr key={s.product + s.estimated_delivery}>
                                    <td>{s.product}</td>
                                    <td>
                                        <span className={`status-badge ${s.progress.replace(' ', '-')}`}>
                                            {s.progress}
                                        </span>
                                    </td>
                                    <td>{formatDate(s.estimated_delivery)}</td>
                                    <td>{s.buyer_username}</td>
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
            ) : (
                <div className="card">
                    <p>No shipments found.</p>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;