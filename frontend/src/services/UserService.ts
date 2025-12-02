import axios from "axios"

const { VITE_BASE_URL } = import.meta.env
axios.defaults.withCredentials=true;

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
            console.log('=== UPDATE USER SERVICE ===');
            
            const formData = new FormData();
            
            // Append all user data to FormData
            Object.keys(user).forEach(key => {
                if (key === 'selfImage' && user[key]?.[0]) {
                    // If it's a file input, append the file
                    console.log('Appending file:', user[key][0]);
                    formData.append('selfImage', user[key][0]);
                } else if (user[key] !== undefined && user[key] !== null) {
                    formData.append(key, user[key]);
                }
            });

            const response = await axios.patch(VITE_BASE_URL + 'api/users/' + 'config', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            console.log('Response:', response.data);
            return response.data
        } catch (error) {
            console.log('Error in updateUser:', error)
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
