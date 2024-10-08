import axios from "axios"

const { VITE_BASE_URL } = import.meta.env
axios.defaults.withCredentials=true;

export class ConversationService {

    static async getConversation(participant1: string, participant2: string) {
        try {
            const response = await axios.post(`${VITE_BASE_URL}api/conversations/get/one/${participant1}`, {
                participant2
            }, {
                withCredentials: true 
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    static async createConversation(participant1: any, participant2: any) {
        try {
            const response = await axios.post(`${VITE_BASE_URL}api/conversations/create/${participant1}`, {
                participant2
            }, {
                withCredentials: true 
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    static async deleteConversation(conversationId: string) {
        try {
            const response = await axios.delete(`${VITE_BASE_URL}api/conversations/${conversationId}`,{
                withCredentials: true 
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
