import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/v1';

const login = async (email, password) =>{
    try {
        const response = await axios.post(`${API_BASE}/admin/login`, {email, password});	
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error)
        return {error: true, message: error.message};
    }
};


export default {login};