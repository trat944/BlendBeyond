import axios from "axios"

const { VITE_BASE_URL } = import.meta.env

export class UserService {
    static async getUsers() {
        try {
            const response = await axios.get(VITE_BASE_URL + 'api/users')
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    static async createUser(user: any) {
        try {
            const response = await axios.post(VITE_BASE_URL + 'api/users', user, {
                withCredentials: true 
            });
            return response.data
        } catch (error) {
            console.log(error)
        }
    };
    static async loginUser(user: any) {
        try {
            const response = await axios.post(VITE_BASE_URL + 'api/users/login', user, {
                withCredentials: true 
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };
    static async logoutUser() {
        try {
          const response = await axios.post(VITE_BASE_URL + 'api/users/logout', {}, {
            withCredentials: true
          });
          return response.data;
        } catch (error) {
          console.log(error);
        }
      }
    static async updateUser(user: any) {
        try {
            console.log({user})
            const response = await axios.patch(VITE_BASE_URL + 'api/users/' + 'config', user, {
                withCredentials: true
              })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    static async deleteUser(userId: any) {
        try {
            const response = await axios.delete(VITE_BASE_URL + 'api/users',
                {
                    data: { userId },
                    withCredentials: true 
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
