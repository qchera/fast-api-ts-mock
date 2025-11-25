import type {ApprovalStatus, ShipmentSummary} from "../../types";
import {updateApprovalStatus} from "../../services/shipmentService.ts";
import {updatePurchase} from "../../redux/slices/userSlice.ts";
import {useDispatch} from "react-redux";
import ApprovalActions from "./ApprovalActions.tsx";
import React from "react";

interface ApprovalData {
    shipmentId: string | null,
    approvalStatus: ApprovalStatus
}

const ApprovalColumn: React.FC<ApprovalData> = ({ shipmentId, approvalStatus }) => {

    const dispatch = useDispatch()

    const handleApprovalAction = async (id: string, status: ApprovalStatus) => {
        const shipment: ShipmentSummary = await updateApprovalStatus(id, status)
        dispatch(updatePurchase(shipment))
    };

    return (
        <div className="approval-cell-content">
                <span className={`approval-badge ${approvalStatus}`}>
                    {approvalStatus}
                </span>

            {approvalStatus === 'pending' && (
                <div className="approval-actions-wrapper">
                    <ApprovalActions
                        id={shipmentId || ''}
                        onAction={handleApprovalAction}
                    />
                </div>
            )}
        </div>
    );

}

export default ApprovalColumn