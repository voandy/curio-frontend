import { SET_USER_GROUPS } from "../types/groupsTypes";

const initialState = {
  userGroups: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_GROUPS:
      return {
        ...state,
        userGroups: action.payload
      };
    default:
      return state;
  }
}
