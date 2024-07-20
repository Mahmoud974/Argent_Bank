// service.ts

import axios from 'axios';
import { Dispatch } from 'redux';
import { clearUser } from '../slice/userSlice'; // Assurez-vous d'importer correctement vos actions Redux


const API_BASE_URL = 'http://localhost:3001/api/v1';


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


export const logout = () => (dispatch: Dispatch) => {
    dispatch(clearUser());
};

export const getUser = async (token: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const { firstName, lastName } = response.data.body.user;
        return { firstName, lastName };
    } catch (error) {
        throw error;
    }
};


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


export const editUser = async (token: string, firstName: string, lastName: string) => {
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
