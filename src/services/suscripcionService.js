import axiosInstance from './axiosInstance.js';

export const registerSubscription = async (formData) => {
    try {
        const response = await axiosInstance.post('/suscriptions', formData);
        return response.data;
    } catch (error) {
        console.error('Error al registrar la suscripción:', error);
        return { error: 'No se pudo registrar la suscripción. Inténtalo de nuevo más tarde.' };
    }
};

export const getSubscription = async () => {
    try {
        const response = await axiosInstance.get('/suscriptions');
        return response.data;
    } catch (error) {
        console.log(error);
        return [];        
    }
};