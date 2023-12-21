import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../store/auth';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactList = () => {
    const { token } = useContext(AuthContext);

    const [contactData, setContactData] = useState([]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/view-all-contact", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token,
                    },
                });
                if (response.ok) {
                    const completeRes = await response.json();
                    const completeData = completeRes.data;
                    setContactData(completeData);

                } else {
                    const errorResponse = await response.json();
                }
            } catch (error) {
                console.log("Error on Contact Page:", error);
            }
        };
        fetchUserDetails();
    }, [token])

    const deleteContact = async (_id) => {

        try {
            const response = await fetch(`http://localhost:5000/api/delete-contact?_id=${_id}`, {
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


    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Reason</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contactData.map((currentContact, i) => {
                            const { _id, name, email, mobile, reason } = currentContact;
                            return (
                                <tr key={i}>
                                    <td>{name}</td>
                                    <td>{email}</td>
                                    <td>{mobile}</td>
                                    <td>{reason}</td>
                                    <td><button className='deleteBtn' onClick={() => deleteContact(_id)}>Delete</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default ContactList