import {
    SET_NEW_GROUP,
  } from "../types/groupsTypes";

  const initialState = {
    userGroups: {},
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_NEW_GROUP:
        return {
          ...state,
          userGroups: action.payload
        };
      default:
        return state;
    }
  }