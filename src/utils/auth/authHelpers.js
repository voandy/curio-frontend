import axios from "axios";
import { AsyncStorage } from "react-native";
import setAuthToken from "./setAuthToken";
import jwt_decode from "jwt-decode";

// register user based on user details
export const registerUserAPIRequest = userData => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://curioapp.herokuapp.com/api/register", userData)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// log user in with user details
export const loginUserAPIRequest = user => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://curioapp.herokuapp.com/api/login", user)
      .then(res => {
        // Set token to AsyncStorage
        const { token } = res.data;
        // Save to AsyncStorage
        AsyncStorage.setItem("userToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // return decoded token
        resolve(decoded);
      })
      .catch(err => reject(err));
  });
};
