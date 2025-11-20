import React, { useEffect, useState } from 'react';
import { shipmentService } from '../api/services';
import type { Shipment } from '../types';
import styles from './Dashboard.module.css';

export const Dashboard: React.FC = () => {
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await shipmentService.getAllMy();
                setShipments(data);
            } catch (e) {
                console.error(e);
            }
        };

        fetchData();
    }, [refreshKey]);

    const handleDelete = async (id: string) => {
        if (confirm('Видалити посилку?')) {
            try {
                await shipmentService.delete(id);
                setShipments((prev) => prev.filter((s) => s.id !== id));
            } catch (e) {
                console.error(e);
            }
        }
    };

    const handleFillTable = async () => {
        try {
            await shipmentService.fillTable();
            setRefreshKey((prev) => prev + 1);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles.controls}>
                <h2>Мої посилки</h2>
                <button onClick={handleFillTable} className={styles.fillBtn}>
                    ✨ Заповнити тестовими даними
                </button>
            </div>

            <table className={styles.table}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Товар</th>
                    <th>Статус</th>
                    <th>Доставка</th>
                    <th>Дії</th>
                </tr>
                </thead>
                <tbody>
                {shipments.map((s) => (
                    <tr key={s.id}>
                        <td>{s.id.slice(0, 8)}...</td>
                        <td>{s.product}</td>
                        <td>
                            <span className={styles[s.progress.replace(" ", "")]}>
                              {s.progress}
                            </span>
                        </td>
                        <td>{new Date(s.estimated_delivery).toLocaleDateString()}</td>
                        <td>
                            <button
                                onClick={() => handleDelete(s.id)}
                                className={styles.deleteBtn}
                            >
                                X
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};