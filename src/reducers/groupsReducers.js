import {
    SET_USER_GROUPS, ADD_NEW_GROUP,
  } from "../types/groupsTypes";

  const initialState = {
    userGroups: [],
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_USER_GROUPS:
        return {
          ...state,
          userGroups: action.payload
        }
      case ADD_NEW_GROUP:
        return {
          ...state,
          userGroups: action.payload
        };
      default:
        return state;
    }
  }