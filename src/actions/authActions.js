import axios from "axios";
import setAuthToken from "../utils/auth/setAuthToken";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "../types/authTypes";

// Register User
export const registerUser = userData => dispatch => {
  return axios
    .post("http://curioapp.herokuapp.com/api/email/id/:id", userData)
    .then(res => console.log(res.data))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  
  return axios
    .post("http://curioapp.herokuapp.com/api/login", userData)
    .then(res => {

      // Save to AsyncStorage
      // Set token to AsyncStorage
      const { token } = res.data;
      AsyncStorage.setItem("userToken", token);

      // Set token to Auth header
      setAuthToken(token);

      // Decode token to get user data
      const decoded = jwt_decode(token);
      
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Log user out
export const logoutUser = () => dispatch => {
  return new Promise(
    function (resolve, reject) {
        var logoutIsSuccess;

        try {
          // Remove token from AsyncStorage
          AsyncStorage.removeItem("userToken");
          // Remove auth header for future requests
          setAuthToken(false);
          // Set current user to empty object {} which will set isAuthenticated to false
          dispatch(setCurrentUser({}));

          // logout is successful
          logoutIsSuccess = true;
        }
        catch {

          // logout is unsuccessful
          logoutIsSuccess = false;
        }

        if (logoutIsSuccess) {
            resolve("logout succeeds"); // fulfilled
        } else {
            reject(new Error('logout fails')); // reject
        }
    }
  );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};