import axios from "axios"

const { VITE_BASE_URL } = import.meta.env
export class UserService {
    static async getUsers() {
        try {
            const response = await axios.get(VITE_BASE_URL + 'users')
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    static async createUser(user: any) {
        try {
            const response = await axios.post(VITE_BASE_URL + 'users', user)
            return response.data
        } catch (error) {
            console.log(error)
        }
    };
    static async loginUser(user: any) {
        try {
            const response = await axios.post(VITE_BASE_URL + 'users/' + 'login', user)
            return response.data
        } catch (error) {
            console.log(error)
        }
    };
    static async updateUser(user: any) {
        try {
            const response = await axios.patch(VITE_BASE_URL + 'users/' + 'config', user)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    // `${VITE_BASE_URL}users/${userId}`
    static async deleteUser(userId: any) {
        try {
            const response = await axios.delete(VITE_BASE_URL + 'users', {
                data: { userId }, 
              });
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}
