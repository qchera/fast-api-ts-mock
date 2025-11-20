import React from 'react';
import { Header } from '../Header/Header';
import styles from './Layout.module.css';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.mainContent}>{children}</main>
        </div>
    );
};