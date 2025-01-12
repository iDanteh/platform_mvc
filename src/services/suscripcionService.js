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

export const sendWhatsAppMessage = async ({ to, message }) => {
    try {
        const response = await axiosInstance.post('/send-message', { to, message });
        return response.data;
    } catch (error) {
        console.error('Error al enviar mensaje de WhatsApp:', error);
        throw error;
    }
};

export const updateSubscription = async (id_Subscription, formData) => {
    try {
        // Verifica que el ID sea un número o una cadena válida
        console.log('ID que se envía:', id_Subscription);

        const response = await axiosInstance.put(`/suscriptions/${id_Subscription}`, formData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la suscripción:', error);
        throw error;
    }
};