import {
  SET_CURRENT_USER_DATA,
  CLEAR_CURRENT_USER_DATA,
  USER_DATA_LOADING
} from "../types/userTypes";

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
    case CLEAR_CURRENT_USER_DATA:
      return initialState;
    case USER_DATA_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
