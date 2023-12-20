import React, { useContext } from 'react';
import { AuthContext } from '../store/auth';
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const UserData = (props) => {

    const { token } = useContext(AuthContext);
    // const navigate = useNavigate();


    const deleteUser = async (_id) => {

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


    return (
        <>
            {
                props.userData.map((curUser, i) => {
                    const { _id, name, email, role, mobile, status } = curUser;
                    return (
                        <tr key={i}>
                            <td>{name}</td>
                            <td>{email}</td>
                            <td>{mobile}</td>
                            <td>{role}</td>
                            <td>{status}</td>
                            <td><button onClick={() => deleteUser(_id)}>Delete</button></td>
                        </tr>
                    )
                })
            }
        </>
    )
}

export default UserData