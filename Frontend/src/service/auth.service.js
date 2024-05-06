import axios from "axios";
import { authKey } from "../constant/storageKey";
import { decodeToken } from "../utils/jwt";
import { getFromLocalStorage, setLocalStorage } from "../utils/local-storage";

const Signup = async (formField) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/auth/users/",
      formField
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

//  export const Login = async(formField) => {
//     try {
//         const response = await axios.post('http://127.0.0.1:8000/auth/jwt/create', formField)
//         return response.data;
//     } catch (error) {
//         console.log(error);
//     }
// }
const logIn = async (formField) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/auth/jwt/create",
      formField
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const ForgotPassword = async (formField) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/reset-password",
      formField
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


const DoctorProfile =async (formField) => {
  try {
    const response = await axios.put(
      "http://127.0.0.1:8000/specialist/profile/1/",
      formField
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const DoctorProfileEducation = async (formField) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/specialist/education/",
      formField
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const DoctorProfileEducationUpdate = async (formField) => {
  try {
    const response = await axios.put(
      "http://127.0.0.1:8000/specialist/education/1/",
      formField
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const DoctorProfileExperience = async (formField) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/specialist/experiance/",
      formField
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


const DoctorProfileExperienceUpdate = async (formField) => {
  try {
    const response = await axios.put(
      "http://127.0.0.1:8000/specialist/experiance/1/",
      formField
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const   PatientProfile = async (formField) => {
  try {
    const response = await axios.put(
      "http://127.0.0.1:8000/patient/profile/1/",
      formField
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const PatientCredentials = async (formField) => {
  try {
    const response = await axios.put(
      "http://127.0.0.1:8000/patient/credientials/",
      formField
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};



export const setUserInfo = ({ accessToken }) => {
  return setLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decodedToken = decodeToken(authToken);
    return decodedToken;
  } else {
    return null;
  }
};
export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  return !!authToken;
};
const loggedOut = () => {
  return localStorage.removeItem(authKey);
};
// const Logout = () => {
//   localStorage.removeItem("Token");
// };

const loginService = {
  logIn,
  Signup,
  getUserInfo,
  isLoggedIn,
  setUserInfo,
  loggedOut,
  DoctorProfile,
  PatientProfile,
  DoctorProfileEducation,
  DoctorProfileExperience,
  DoctorProfileEducationUpdate,
  DoctorProfileExperienceUpdate,
  PatientCredentials,
};
export default loginService;
