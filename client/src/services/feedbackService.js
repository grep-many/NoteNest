import axiosInstance from "@/utils/axiosInstance"

export const getFeedbackService = async () => {
    try {
        const response = await axiosInstance.get('/feedback/fetch');

        return response;
    } catch (err) {
        console.error('Error fetching filtered Feedback:', err.message);
    }
};

export const addFeedbackService = async (feedbackData) => {
    try {
        const response = await axiosInstance.post('/feedback/add',feedbackData);
        return response
    } catch (err) {
        console.error(err);
    }
}