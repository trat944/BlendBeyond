import axios from "axios"

const { VITE_BASE_URL } = import.meta.env
export class LikeService {

    static async createLike(fromUserId: any, toUserId: any) {
        try {
            const response = await axios.post(VITE_BASE_URL + 'likes', {
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
