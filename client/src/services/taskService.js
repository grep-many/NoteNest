import axiosInstance from "@/utils/axiosInstance"

export const fetchTasksService = async (searchTerm='') => {
    try {
        const response = await axiosInstance.get('/task/fetch', {
            params: { search: searchTerm }, // Add the search query parameter
        });

        return response;
    } catch (err) {
        console.error('Error fetching filtered task:', err.message);
    }
};

export const addTaskService = async (noteData) => {
    try {
        const response = await axiosInstance.post('/task/add',noteData);
        return response
    } catch (err) {
        console.error(err);
    }
} 

export const updateTaskService = async (id,noteData) => {
    try {
        const response = await axiosInstance.put(`/task/edit/${id}`,noteData);
        return response
    } catch (err) {
        console.error(err);
    }
} 

export const removeTaskService = async (id) => {
    try {
        const response = await axiosInstance.delete(`/task/remove/${id}`);
        return response
    } catch (err) {
        console.error(err);
    }
} 