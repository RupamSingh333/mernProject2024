import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login-user`, {
            email,
            password
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
