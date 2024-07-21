import axios from 'axios';
const API_BASE_URL = 'http://localhost:3001/api/v1';


/**
 * Connecter à la page de profile
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
        const { token, user } = response.data.body;
        return { token, user };
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
        return response.data;
    } catch (error) {
        throw error;
    }
};

;

