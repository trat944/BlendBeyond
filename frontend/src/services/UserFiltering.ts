import axios from "axios"

const { VITE_BASE_URL } = import.meta.env

export class UserFilteringService {
  static async getDesiredUsers(loggedUser: any) {
    const { city, lookingFor, sex, likedUsers, dislikedUsers } = loggedUser;
    
    try {
      const token = loggedUser.token; 
      const response = await axios.post(
        VITE_BASE_URL + 'filteredUsers/desired',
        {
          city,
          lookingFor,
          sex,
          likedUsers,
          dislikedUsers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  static async getMatchedUsers(loggedUser: any) {
    const { likedUsers, likedBy } = loggedUser;
    try {
      const token = loggedUser.token;
      const response = await axios.post(VITE_BASE_URL + 'filteredUsers/matched', {
        likedUsers,
        likedBy,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}
