import axios from "axios"

const { VITE_BASE_URL } = import.meta.env
axios.defaults.withCredentials=true;

export class DislikeService {

    static async createDislike(fromUserId: any, toUserId: any) {
        try {
            const response = await axios.post(VITE_BASE_URL + 'api/dislikes', {
                fromUserId,
                toUserId
            }, {
                withCredentials: true 
              });
            return response.data
        } catch (error) {
            console.log(error)
        }
    } 
}
