import {
  SET_USER_GROUPS,
  ADD_NEW_GROUP,
  SET_SELECTED_GROUP,
  GET_ERRORS
} from "../types/groupsTypes";

const initialState = {
  userGroups: [],
  selectedGroup: {},
  errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_GROUPS:
      return {
        ...state,
        userGroups: action.payload
      };
    case ADD_NEW_GROUP:
      return {
        ...state,
        userGroups: action.payload
      };
    case SET_SELECTED_GROUP:
      return {
        ...state,
        selectedGroup: action.payload
      };
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
}
