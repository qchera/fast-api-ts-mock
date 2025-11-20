import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { shipmentService } from '../api/services';
import { ProgressStatus } from '../types';
import styles from './Form.module.css'; 

export const CreateShipment: React.FC = () => {
    const [product, setProduct] = useState('');
    const [status, setStatus] = useState<ProgressStatus>(ProgressStatus.PLACED);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await shipmentService.create({ product, progress: status });
        navigate('/dashboard');
    };

    return (
        <div className={styles.formContainer}>
            <h2>Нова посилка</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <label>Назва товару</label>
                    <input value={product} onChange={e => setProduct(e.target.value)} required />
                </div>
                <div className={styles.group}>
                    <label>Статус</label>
                    <select value={status} onChange={e => setStatus(e.target.value as ProgressStatus)}>
                        <option value={ProgressStatus.PLACED}>Placed</option>
                        <option value={ProgressStatus.IN_TRANSIT}>In Transit</option>
                        <option value={ProgressStatus.SHIPPED}>Shipped</option>
                    </select>
                </div>
                <div className={styles.actions}>
                    <button type="button" onClick={() => navigate(-1)}>Назад</button>
                    <button type="submit" className={styles.submitBtn}>Створити</button>
                </div>
            </form>
        </div>
    );
};