import axiosInstance from './axiosInstance';

export const registerClient = async (formData) => {
    try {
        const response = await axiosInstance.post("/users/register", formData);
        return response.data;
    } catch (error) {
        console.error('Error al registrar cliente:', error);
        throw error;
    }
};

export const fetchClients = async () => {
    try {
        const response = await axiosInstance.get('/users');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        throw error;
    }
};
