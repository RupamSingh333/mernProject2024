import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../store/auth';
import UserData from './UserData';

const UsersList = () => {

    const { token } = useContext(AuthContext);

    const [userData, setUserData] = useState([])

    // console.log(userData);


    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/view-all-user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token,
                    },
                });
                if (response.ok) {
                    const completeRes = await response.json();
                    const completeData = completeRes.data;
                    setUserData(completeData);

                } else {
                    const errorResponse = await response.json();
                }
            } catch (error) {
                console.log("Error on Contact Page:", error);
            }
        };
        fetchUserDetails();
    }, [token])
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Role</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <UserData userData={userData} />
                </tbody>
            </table>
        </>
    )
}

export default UsersList