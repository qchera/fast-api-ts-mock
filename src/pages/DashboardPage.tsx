import type {User} from '../types';
import {formatDate} from "../utils/dateUtils";
import {useSelector} from "react-redux";

const DashboardPage: React.FC = () => {
    const me: User | null = useSelector((state: any) => state.user.userData);

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