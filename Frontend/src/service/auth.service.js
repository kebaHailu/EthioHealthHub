import axios from 'axios';
import {authKey} from '../constant/storageKey';
import {decodeToken} from '../utils/jwt';
import { getFromLocalStorage, setLocalStorage } from '../utils/local-storage';

 const Signup = async(formField) => {
    try {
        const response = await axios.post(
          "http://127.0.0.1:8000/auth/users/",
          formField
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
   

}
export default Signup

 export const Login = async(formField) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', formField)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const ForgotPassword = async (formField)=>{
    try{
        const response = await axios.post('http://127.0.0.1:8000/api/reset-password', formField)
        return response.data;
    }
    catch (error){
        console.log(error);
    }
}

export const setUserInfo = ({ accessToken }) => {
    return setLocalStorage(authKey, accessToken);
}

export const getUserInfo = () => {
    const authToken = getFromLocalStorage(authKey);
    if (authToken) {
        const decodedToken = decodeToken(authToken);
        return decodedToken
    } else {
        return null
    }
}
export const isLoggedIn = () => {
    const authToken = getFromLocalStorage(authKey);
    return !!authToken;
}
export const loggedOut = () => {
    return localStorage.removeItem(authKey)
}