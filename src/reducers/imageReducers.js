import {
    SET_IMAGE
  } from "../types/imageTypes";

  const initialState = {
    imageURL: {},
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_IMAGE:
        return {
          ...state,
          imageURL: action.payload
        };
      default:
        return state;
    }
  }