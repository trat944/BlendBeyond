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
            console.log('User data received:', user);
            
            const formData = new FormData();
            
            // Append all user data to FormData
            Object.keys(user).forEach(key => {
                if (key === 'selfImage') {
                    // Handle file input specially
                    if (user[key]?.[0] instanceof File) {
                        console.log('Appending file:', user[key][0]);
                        formData.append('selfImage', user[key][0]);
                    } else {
                        console.log('Skipping selfImage - no valid file');
                    }
                } else if (user[key] !== undefined && user[key] !== null && user[key] !== '') {
                    // Skip these metadata fields that come from FileList
                    if (key === 'likedBy' || key === 'likedUsers' || key === 'dislikedBy' || key === 'dislikedUsers') {
                        console.log(`Skipping ${key} - metadata field`);
                        return;
                    }
                    // Only append non-empty values
                    console.log(`Appending ${key}:`, user[key]);
                    formData.append(key, user[key]);
                } else {
                    console.log(`Skipping ${key} - empty or undefined`);
                }
            });

            console.log('FormData entries:');
            for (let pair of formData.entries()) {
                console.log(pair[0] + ':', pair[1]);
            }

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
