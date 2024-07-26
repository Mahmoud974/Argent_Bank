import axios from 'axios';
const API_BASE_URL = 'http://localhost:3001/api/v1';

/**
 * Fetch user profile using the token
 * @param token 
 * @returns 
 */
const getUser = async (token: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/profile`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.body;
  } catch (error) {
    throw error;
  }
};

/**
 * Se connecter à la page de profil
 * @param email 
 * @param password 
 * @returns 
 */
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, {
      email,
      password
    });
    const { token } = response.data.body;
    const userProfile = await getUser(token);
    return { token, user: userProfile };
  } catch (error) {
    throw error;
  }
};

/**
 * Déconnecter de la page 
 * @returns 
 */
export const logout = () => {
  return new Promise<void>((resolve) => {
    resolve();
  });
};

/**
 * Mettre à jour le nom et prenom
 * @param token 
 * @param firstName 
 * @param lastName 
 * @returns 
 */
export const updateUserProfile = async (token: string, firstName: string, lastName: string) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user/profile`, {
      firstName,
      lastName
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.body;
  } catch (error) {
    throw error;
  }
};
