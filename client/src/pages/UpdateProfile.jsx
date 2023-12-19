import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfile = () => {
    const { token } = useContext(AuthContext);


    const [user, setUser] = useState({
        name: "",
        mobile: "",
        avtar: ""
    });

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        })
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/update-profile", {
                method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL",
                    "Authorization": token,
                },
                // body: FormData.stringify(user),
            });
            if (response.ok) {
                const completeRes = await response.json();
                toast.success(
                    completeRes.message
                );
            } else {
                const errorResponse = await response.json();
                toast.error(
                    errorResponse.message ||
                    "Register failed. Invalid credentials or server error."
                );
            }

        } catch (error) {
            console.log("Error in Register Page", error);
            toast.error("An unexpected error occurred.");
        }

    };
    return (
        <>
            <div className="update-profile">
                <div className="update-form">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="avtar">Avtar</label>
                            <br />
                            <input
                                type="file"
                                name="avtar"
                                id="avtar"
                                value={user.avtar}
                                onChange={handleInput}
                            />
                        </div>
                        <div>
                            <label htmlFor="name">Name</label>
                            <br />
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleInput}
                                placeholder=""
                            />
                        </div>

                        <div>
                            <label htmlFor="phone">Mobile no.</label>
                            <br />
                            <input
                                type="number"
                                name="mobile"
                                value={user.mobile}
                                onChange={handleInput}
                                placeholder=""
                            />
                        </div>

                        <br />
                        <button type="submit" className="btn btn-submit">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProfile