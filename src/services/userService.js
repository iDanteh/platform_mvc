import axiosInstance from './axiosInstance.js';

export const registerClient = async (nombre_user, apellido_pat, apellido_mat, phone_user, email, password) => {
        try {
            const response = await axiosInstance.post("/users/register", {
                nombre_user,
                apellido_pat,
                apellido_mat,
                phone_user,
                email,
                password
            });
            return response.data;
        } catch (error) {
            console.log(error)
            throw error;
        }
};