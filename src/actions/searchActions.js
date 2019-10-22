import {
  SET_SEARCH_RESULTS_USER,
  SET_SEARCH_RESULTS_GROUP
} from "../types/searchTypes";

import {
  searchGroupsAPIRequest,
  searchUsersAPIRequest
} from "../utils/APIHelpers/searchAPIHelper";

// Async Redux Thunk actions //
// get matching users given search terms
export const searchUsers = searchTerms => dispatch => {
  return new Promise((resolve, reject) => {
    // get all artefacts posted by user
    searchUsersAPIRequest(searchTerms)
      // success
      .then(res => {
        // dispatch(setUserSearchResults(res.data));
        resolve(res.data);
      })
      // failure
      .catch(err => {
        console.log("Failed to search users: " + err);
        reject(err);
      });
  });
};

// get matching groups given search terms
export const searchGroups = searchTerms => dispatch => {
  return new Promise((resolve, reject) => {
    // get all artefacts posted by user
    searchGroupsAPIRequest(searchTerms)
      // success
      .then(res => {
        // dispatch(setGroupSearchResults(res.data));
        resolve(res.data);
      })
      // failure
      .catch(err => {
        console.log("Failed to search groups: " + err);
        reject(err);
      });
  });
};

export const clearSearchResults = () => dispatch => {
  dispatch(setUserSearchResults([]));
  dispatch(setGroupSearchResults([]));
};

// !!! this redux state is not used at the moment !!! //

// Redux actions //
// store users search results into redux state
export const setUserSearchResults = decoded => {
  return {
    type: SET_SEARCH_RESULTS_USER,
    payload: decoded
  };
};

// store groups search results into redux state
export const setGroupSearchResults = decoded => {
  return {
    type: SET_SEARCH_RESULTS_GROUP,
    payload: decoded
  };
};
