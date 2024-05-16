import axios from "axios"

const { VITE_BASE_URL } = import.meta.env
export class LikeService {

    static async createLike(fromUserId: any, toUserId: any) {
        try {
            const response = await axios.post(VITE_BASE_URL + 'likes', {
                fromUserId,
                toUserId
            });
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    // static async createDislike(fromUserId: any, toUserId: any) {
    //     try {
    //         const response = await axios.post(VITE_BASE_URL + 'likes/' + 'dislikes', {
    //             fromUserId,
    //             toUserId
    //         });
    //         return response.data
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    
}
