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
    static async getDesiredUsers(loggedUser: any) {
        const { city, lookingFor, sex, likedUsers, dislikedUsers } = loggedUser;
      
        try {
          const response = await axios.post(VITE_BASE_URL + 'users/desired', {
            city,
            lookingFor,
            sex,
            likedUsers,
            dislikedUsers,
          });
          return response.data;
        } catch (error) {
          console.error(error);
          throw error;
        }
      };
    // static async getDesiredUsers(loggedUser: any) {
    //     const { city, lookingFor, sex, likedUsers } = loggedUser;
    //     try {
    //       const response = await axios.post(VITE_BASE_URL + 'users/' + 'desired', {
    //         city,
    //         lookingFor,
    //         sex,
    //         likedUsers,
    //       });
    //       return response.data;
    //     } catch (error) {
    //       console.error(error);
    //       throw error;
    //     }
    // }
    static async createUser(user: any) {
        try {
            const response = await axios.post(VITE_BASE_URL + 'users', user)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async updateUser(user: any) {
        try {
            const response = await axios.patch(VITE_BASE_URL + 'users/' + 'config', user)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}
