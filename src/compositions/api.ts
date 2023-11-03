import axios from "axios";

export function Api() {

    const fetchData = async (action: String, query: any = {}):Promise<any> => {
        let params = {}
        if (query) {
            params = query
        }
        try {
            return  await axios.get(`${action}`, {params});
        } catch (error) {
           // store.commit('setError', error, { root: true })
        }
        return [];
    }

    const sendPost = async (action: String, body: any = {}) => {
        if (!action && !body) return false
        try {
            return await axios.post(`${action}`, body);
        } catch (error) {
            return error;
        }
    }

    const updatePut = async (action: String, body: any = {}) => {
        if (!action && !body) return false
        try {
            return await axios.put(`${action}`, body);
        } catch (error) {
            return error;
        }
    }

    const deleteRequest = async (action: String) => {
        if (!action) return false
        try {
            return await axios.post(`${action}`);
        } catch (error) {
            return error;
        }
    }

    return {fetchData,sendPost,updatePut,deleteRequest}
}
