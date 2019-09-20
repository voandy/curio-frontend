import axios from "axios";
import setAuthToken from "../utils/auth/setAuthToken";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";
import {
  SET_CURRENT_USER,
  USER_LOADING,
  USER_LOGOUT,
  REGISTER_USER,
  LOGIN_USER
} from "../types/authTypes";

// log user out
export const logoutUser = () => dispatch => {
  return new Promise((resolve, reject) => {
    try {
      // Remove token from AsyncStorage
      AsyncStorage.removeItem("userToken");
      // Remove auth header for future requests
      setAuthToken(false);
      // Set current user to empty object {} which will set isAuthenticated to false
      dispatch(userLogOut());
      // return success message
      resolve("User logged out successfully!");
    } catch {
      // logout is unsuccessful
      reject("User failed to log out.");
    }
  });
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// loading user
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// logs out user
export const userLogOut = () => {
  return {
    type: USER_LOGOUT
  };
};

export const registerUser = user => {
  return {
    type: REGISTER_USER
  };
};

export const loginUser = decoded => {
  return {
    type: LOGIN_USER,
    payload: decoded
  };
};
