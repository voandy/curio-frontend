import { SET_USER_ARTEFACTS, ADD_NEW_ARTEFACT } from "../types/artefactsTypes";

const initialState = {
  userArtefacts: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_ARTEFACTS:
      return {
        ...state,
        userArtefacts: action.payload
      };
    case ADD_NEW_ARTEFACT:
      return {
        ...state,
        userArtefacts: state.userArtefacts.concat(action.payload)
      };
    default:
      return state;
  }
}
