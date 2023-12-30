import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login-user`, {
            email,
            password
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return response;
    } catch (error) {
        return error.response.data;
    }
};

export default loginUser;
