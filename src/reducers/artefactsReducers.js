import {
  SET_USER_ARTEFACTS,
  SET_ARTEFACT_IN_CACHE,
  ARTEFACT_DATA,
  ARTEFACT_COMMENTS
} from "../types/artefactsTypes";

const initialState = {
  userArtefacts: [],
  cache: {}
};

// cache format: {
//   artefactId: {
//      artefact data: {},
//      comments: {}
//   }
// }

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_ARTEFACTS:
      return {
        ...state,
        userArtefacts: action.payload
      };
    case SET_ARTEFACT_IN_CACHE:
      // access cache from store
      let { cache } = state;
      // extract action data
      const { payload, cache_type } = action;
      // if group is not in cache, initialize it
      if (!cache[payload._id]) cache[payload._id] = {};
      // update if exist, add new artefact data to the cache
      cache[payload._id][cache_type] = action.payload;
      // set redux state
      return {
        ...state,
        cache
      };
    default:
      return state;
  }
}
