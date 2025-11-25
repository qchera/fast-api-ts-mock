import React from "react";
import UserInfoCard from "./UserInfoCard.tsx";
import ShipmentsInfoCard from "./ShipmentsInfoCard.tsx";

const DashboardPage: React.FC = () => {

    return (
        <div className="page-container">
            <h1>Dashboard</h1>
            <UserInfoCard />
            <br/>
            <ShipmentsInfoCard />
        </div>
    );
};

export default DashboardPage;