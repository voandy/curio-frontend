import {
  SET_SEARCH_RESULTS_USER,
  SET_SEARCH_RESULTS_GROUP
} from "../types/searchTypes";

import {
  searchGroupsAPIRequest,
  searchUsersAPIRequest
} from "../utils/APIHelpers/searchAPIHelper";

// Async Redux actions //

// get matching users given search terms
export const searchUsers = searchTerms => dispatch => {
  return new Promise((resolve, reject) => {
    // get all artefacts posted by user
    searchUsersAPIRequest(searchTerms)
      // success
      .then(res => {
        dispatch(setUserSearchResults(res.data));
        resolve(res);
      })
      // failure
      .catch(err => {
        console.log("search users: " + err);
        reject(err);
      });
  });
};

// get matching groups given search terms
export const searchUsers = searchTerms => dispatch => {
   return new Promise((resolve, reject) => {
    // get all artefacts posted by user
    searchGroupsAPIRequest(searchTerms)
      // success
      .then(res => {
        dispatch(setGroupSearchResults(res.data));
        resolve(res);
      })
      // failure
      .catch(err => {
        console.log("search groups: " + err);
        reject(err);
      });
  });
 };

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