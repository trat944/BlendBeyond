import axios from "axios"

const { VITE_BASE_URL } = import.meta.env

export class UserFilteringService {
  static async getDesiredUsers(loggedUser: any) {
    const { city, lookingFor, sex, likedUsers, dislikedUsers } = loggedUser;
    
    try {
      const response = await axios.post(
        VITE_BASE_URL + 'api/filteredUsers/desired',
        {
          city,
          lookingFor,
          sex,
          likedUsers,
          dislikedUsers,
        },
        {
          withCredentials: true 
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  static async getMatchedUsers(loggedUser: any) {
    const { id, likedUsers, likedBy } = loggedUser;
    try {
      const response = await axios.post(VITE_BASE_URL + 'api/filteredUsers/matched', {
        id,
        likedUsers,
        likedBy,
      }, {
        withCredentials: true 
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  static async getUsersWithConversation(senderId: any) {
    try {
        const response = await axios.get(`${VITE_BASE_URL}api/filteredUsers/get/${senderId}`,
         {
            withCredentials: true 
          });
        return response.data
    } catch (error) {
        console.log(error)
    }
} 
}
