import axios from "axios"

const { VITE_BASE_URL } = import.meta.env
axios.defaults.withCredentials=true;

export class MessagesService {

    static async getMessages(senderId: string, receiverId: string) {
        try {
            const response = await axios.post(`${VITE_BASE_URL}api/messages/get/${senderId}`, {
              receiverId
            }, {
                withCredentials: true 
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    static async sendMessage(senderId: string, receiverId: string, message: string) {
        try {
            const response = await axios.post(`${VITE_BASE_URL}api/messages/send/${senderId}`, {
              receiverId,
              message
            }, {
                withCredentials: true 
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    static async deleteMessage(messageId: any) {
        try {
            const response = await axios.delete(VITE_BASE_URL + 'api/messages/delete',
                {
                    data: { messageId },
                    withCredentials: true 
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}