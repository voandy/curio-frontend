import {
    SET_CURRENT_USER_DATA,
    USER_DATA_LOADING,
  } from "../actions/userTypes";

  const initialState = {
    userData: {},
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_USER_DATA:
        return {
          ...state,
          userData: action.payload
        };
      case USER_DATA_LOADING:
        return {
          ...state,
          loading: true
        }; 
      default:
        return state;
    }
  }