import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../store/auth';
import Switch from '@mui/material/Switch';
import { toast } from "react-toastify";
import { RotatingLines } from 'react-loader-spinner';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

const UsersList = () => {

    const { token } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);

    const deleteAlert = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:5000/api/delete-user?_id=${_id}`, {
                        method: "GET",
                        headers: {
                            "Authorization": token,
                        },
                    });

                    if (response.ok) {
                        const completeRes = await response.json();
                        Swal.fire({
                            title: "Deleted!",
                            text: completeRes.message,
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else {
                        const errorResponse = await response.json();
                        Swal.fire({
                            title: "Deleted!",
                            text: errorResponse.message,
                            icon: "error",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                } catch (error) {
                    console.log("Error on delete user function:", error);
                    Swal.fire({
                        title: "Deleted!",
                        text: error,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            }
        });
    };

    const changeStatus = async (_id) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/change-status?_id=${_id}`, {
                method: "GET",
                headers: {
                    "Authorization": token,
                },
            });

            if (response.ok) {
                const completeRes = await response.json();
                setLoading(false);
                toast.success(
                    completeRes.message
                );


            } else {
                setLoading(false);
                const errorResponse = await response.json();
                toast.error(
                    errorResponse.message
                );
            }
        } catch (error) {
            console.log("Error on changeStatus function:", error);
            toast.error("An unexpected error occurred.");
        }
    };

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
                    setLoading(false);
                } else {
                    const errorResponse = await response.json();
                    console.log("Error on Contact Page:", errorResponse.message);
                }

            } catch (error) {
                setLoading(false);
                console.log("Error on Contact Page:", error);
            }
        };
        fetchUserDetails();
    }, [userData]);


    return (
        <>
            <RotatingLines
                visible={loading}
                height="45"
                width="45"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userData.map((curUser, i) => {
                            const { _id, name, email, role, mobile, status } = curUser;
                            return (
                                <tr key={i}>
                                    <td>{name}</td>
                                    <td>{email}</td>
                                    <td>{mobile}</td>
                                    <td>{role}</td>
                                    <td>
                                        <Switch
                                            checked={status === 'Y'}
                                            onClick={() => changeStatus(_id)}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </td>
                                    <td>
                                        <DeleteIcon className='delete-icon' onClick={() => deleteAlert(_id)} />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default UsersList