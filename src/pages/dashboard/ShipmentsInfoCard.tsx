import {useSelector} from "react-redux";
import {selectPurchases, selectSales} from "../../redux/store.ts";
import {formatDate} from "../../utils/dateUtils.ts";
import React from "react";
import ApprovalColumn from "./ApprovalColumn.tsx";

const ShipmentsInfoCard: React.FC = () => {
    const purchases = useSelector(selectPurchases)
    const sales = useSelector(selectSales)

    return (
        <div>
            <h2>My Purchases</h2>
            {purchases ? (
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
                            {purchases.map((s) => (
                                <tr key={s.product + s.estimatedDelivery}>
                                    <td>{s.product}</td>
                                    <td>
                                        <span className={`status-badge ${s.progress.replace(' ', '-')}`}>
                                            {s.progress}
                                        </span>
                                    </td>
                                    <td>{formatDate(s.estimatedDelivery)}</td>
                                    <td>{s.sellerUsername}</td>
                                    <td>
                                        <ApprovalColumn shipmentId={s.id} approvalStatus={s.approvalStatus} />
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
            {sales ? (
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
                            {sales.map((s) => (
                                <tr key={s.product + s.estimatedDelivery}>
                                    <td>{s.product}</td>
                                    <td>
                                        <span className={`status-badge ${s.progress.replace(' ', '-')}`}>
                                            {s.progress}
                                        </span>
                                    </td>
                                    <td>{formatDate(s.estimatedDelivery)}</td>
                                    <td>{s.buyerUsername}</td>
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
            ) : (
                <div className="card">
                    <p>No shipments found.</p>
                </div>
            )}
        </div>
    )
}

export default ShipmentsInfoCard
