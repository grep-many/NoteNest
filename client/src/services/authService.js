import axiosInstance from "@/utils/axiosInstance"

export const registerService = async (formData, setProgress) => {
    try {
        setProgress(60);
        const response = await axiosInstance.post('/user/register', formData)
        if (response?.status === 201) {
            return response?.data;
        }
    } catch (err) {
        const { response } = err;
        return response?.data?.msg ? response?.data?.msg+"!" : "Something went wrong";
    } finally {
        setProgress(80);
    }
}

export const loginService = async (formData, setProgress) => {
    try {
        setProgress(60);
        const response = await axiosInstance.post('/user/login', formData)
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (err) {
        const { response } = err;
        return response?.data?.msg ? response?.data?.msg+"!" : "There was a problem logging you!";
    } finally {
        setProgress(80);
    }
}

export const checkServerHealthService = async ()=>{
    try{
        const {data} = await axiosInstance.get('/');
        if(data?.success){
            return true;
        }else{
            return false;
        }
    }catch(err){
        console.error("Something went wrong with server!");
        return false;
    }
}