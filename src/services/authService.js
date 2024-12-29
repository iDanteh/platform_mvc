import axiosInstance from './axiosInstance.js';

export const authServiceLogin = async (email, password) =>{
    try {
        const response = await axiosInstance.post("/admin/login", {
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
};