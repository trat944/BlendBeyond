import axios from "axios"

const { VITE_BASE_URL } = import.meta.env
export class MessagesService {

    static async getMessages(senderId: string, receiverId: string) {
        try {
            const response = await axios.post(`${VITE_BASE_URL}messages/get/${senderId}`, {
              receiverId
            }, {
                withCredentials: true 
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}