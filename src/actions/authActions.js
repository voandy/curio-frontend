import setAuthToken from "../utils/auth/setAuthToken";
import { AsyncStorage } from "react-native";
import { SET_CURRENT_USER, USER_LOGOUT } from "../types/authTypes";
import {
  registerUserAPIRequest,
  loginUserAPIRequest
} from "../utils/apiRequestHelpers/authHelpers";
import jwt_decode from "jwt-decode";
// import helper function to deal with image upload
import { uploadImageToGCS } from "../utils/imageUpload";

// Async Redux actions //
// register user based on user details
export const registerUser = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    // retrieve user register details
    const { register } = getState();
    // upload image
    uploadImageToGCS(register.photoURI)
      .then(imageURL => {
        // prepare the body data base on new user details
        const newUser = {
          name: register.name,
          email: register.email,
          username: register.username,
          password: register.password,
          passwordCfm: register.passwordCfm,
          profilePic: imageURL
        };
        // send a post API request to backend to register user
        registerUserAPIRequest(newUser)
          .then(res => resolve(res))
          .catch(err => {
            console.log("Failed to register user: " + err);
            reject(err);
          });
      })
      .catch(err => {
        console.log("Failed to upload image at user registration: " + err);
        reject(err);
      });
  });
};

// login user based on user details
export const loginUser = user => dispatch => {
  return new Promise((resolve, reject) => {
    // post login api request to the backend
    loginUserAPIRequest(user)
      // backend login verification success
      .then(res => {
        try {
          // Set token to AsyncStorage
          const { token } = res.data;
          // Save to AsyncStorage
          AsyncStorage.setItem("userToken", token);
          // Set token to Auth header
          setAuthToken(token);
          // Decode token to get user data
          const decoded = jwt_decode(token);
          // setting user's details to redux store
          dispatch(setCurrentUser(decoded));
          // check if user token is properly set to asyncstorage
          AsyncStorage.getItem("userToken")
            // all good, user can proceed
            .then(() => resolve(decoded))
            // issue with retrieving user token
            .catch(err => {
              console.log("Error retrieving user token at login: " + err);
              reject(err);
            });
        } catch {
          console.log("Error setting user token at login.");
        }
      })
      // backend login verification failed
      // no need to log, usually it's wrong email/username or password
      .catch(err => {
        reject(err);
      });
  });
};

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

// Redux actions //
// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// logs out user
export const userLogOut = () => {
  return {
    type: USER_LOGOUT
  };
};
