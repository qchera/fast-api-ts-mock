import {useSelector} from "react-redux";
import {selectEmail, selectFullName, selectId, selectUsername} from "../../redux/store.ts";
import React from "react";

const UserInfoCard: React.FC = () => {
    const id = useSelector(selectId)
    const username = useSelector(selectUsername)
    const email = useSelector(selectEmail)
    const fullName = useSelector(selectFullName)

    return (
        <div className="card">
            <h3>Current Session</h3>
            {fullName ? (
                <div>
                    <p><strong>ID:</strong> {id}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Username:</strong> {username}</p>
                    <p><strong>Full name:</strong> {fullName}</p>
                    <h3>Welcome back to the administration panel!</h3>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    )
}

export default UserInfoCard