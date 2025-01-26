import axiosInstance from "@/utils/axiosInstance"

export const fetchNotesService = async (searchTerm='') => {
    try {
        const response = await axiosInstance.get('/notes/fetch', {
            params: { search: searchTerm }, // Add the search query parameter
        });

        return response;
    } catch (err) {
        console.error('Error fetching filtered notes:', err.message);
    }
};

export const addNotesService = async (noteData) => {
    try {
        const response = await axiosInstance.post('/notes/add',noteData);
        return response
    } catch (err) {
        console.error(err);
    }
} 

export const updateNotesService = async (id,noteData) => {
    
    try {
        const response = await axiosInstance.put(`/notes/edit/${id}`,noteData);
        return response
    } catch (err) {
        console.error(err);
    }
} 

export const removeNotesService = async (id) => {
    try {
        const response = await axiosInstance.delete(`/notes/remove/${id}`);
        return response
    } catch (err) {
        console.error(err);
    }
} 

export const pinNotesService = async (id) => {
    try {
        const response = await axiosInstance.put(`/notes/pin/${id}`);
        return response
    } catch (err) {
        console.error(err);
    }
} 