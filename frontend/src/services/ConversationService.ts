import axios from "axios"

const { VITE_BASE_URL } = import.meta.env
export class ConversationService {

    static async getConversations(senderId: any) {
        try {
            const response = await axios.get(`${VITE_BASE_URL}conversations/get/${senderId}`,
             {
                withCredentials: true 
              });
            return response.data
        } catch (error) {
            console.log(error)
        }
    } 
}
