import {
  SET_SEARCH_RESULTS_USER,
  SET_SEARCH_RESULTS_GROUP
} from "../types/searchTypes";

// !!! this redux state is not used at the moment !!! //

const initialState = {
  userSearchResults: [],
  groupSearchResults: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_RESULTS_USER:
      return {
        ...state,
        userSearchResults: action.payload
      };
    case SET_SEARCH_RESULTS_GROUP:
      return {
        ...state,
        groupSearchResults: action.payload
      };
    default:
      return state;
  }
}
