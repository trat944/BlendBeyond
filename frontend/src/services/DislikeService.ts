import axios from "axios"

const { VITE_BASE_URL } = import.meta.env
export class DislikeService {

    static async createDislike(fromUserId: any, toUserId: any) {
        try {
            const response = await axios.post(VITE_BASE_URL + 'dislikes', {
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
