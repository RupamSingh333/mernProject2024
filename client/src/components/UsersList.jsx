import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../store/auth';
// import Swal from 'sweetalert2';

const UsersList = () => {


    const { token } = useContext(AuthContext);

    const [userData, setUserData] = useState([])


    const deleteUser = async (_id) => {
        // Swal.fire({
        //     title: "Are you sure?",
        //     text: "You won't be able to revert this!",
        //     icon: "warning",
        //     showCancelButton: true,
        //     confirmButtonColor: "#3085d6",
        //     cancelButtonColor: "#d33",
        //     confirmButtonText: "Yes, delete it!"
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         Swal.fire({
        //             title: "Deleted!",
        //             text: "Your file has been deleted.",
        //             icon: "success",
        //             showConfirmButton: false,
        //             timer: 1500
        //         });
        //     }
        // });
        try {
            const response = await fetch(`http://localhost:5000/api/delete-user?_id=${_id}`, {
                method: "GET",
                headers: {
                    "Authorization": token,
                },
            });

            if (response.ok) {
                const completeRes = await response.json();
                toast.success(
                    completeRes.message
                );


            } else {
                const errorResponse = await response.json();
                toast.error(
                    errorResponse.message
                );
            }
        } catch (error) {
            console.log("Error on delete user function:", error);
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
                        <th>Operations</th>
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
                                    <td>{status}</td>
                                    <td><button className='deleteBtn' onClick={() => deleteUser(_id)}>Delete</button>
                                        <button onClick={() => changeStatus(_id)}>Change Status</button></td>
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