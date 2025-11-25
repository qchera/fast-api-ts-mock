import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import type {ApprovalStatus} from '../../types';

interface ApprovalActionsProps {
    id: string;
    onAction: (id: string, status: ApprovalStatus) => void;
    isLoading?: boolean;
}

const ApprovalActions: React.FC<ApprovalActionsProps> = ({ id, onAction, isLoading = false }) => {
    return (
        <div className="approval-actions">
            <button
                className="action-btn approve"
                onClick={() => onAction(id, 'accepted')}
                disabled={isLoading}
                title="Accept"
            >
                <FaCheck />
            </button>
            <button
                className="action-btn reject"
                onClick={() => onAction(id, 'rejected')}
                disabled={isLoading}
                title="Reject"
            >
                <FaTimes />
            </button>
        </div>
    );
};

export default ApprovalActions;