import { SET_USER_ARTEFACTS, SET_SELECTED_ARTEFACT, SET_ARTEFACT_COMMENTS, ADD_ARTEFACT_COMMENT } from "../types/artefactsTypes";

const initialState = {
  userArtefacts: [],
  selectedArtefact: {},
  artefactComments: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_ARTEFACTS:
      return {
        ...state,
        userArtefacts: action.payload
      };
    case SET_SELECTED_ARTEFACT:
      return {
        ...state,
        selectedArtefact: action.payload
      };
    case SET_ARTEFACT_COMMENTS:
      return {
        ...state,
        artefactComments: action.payload
      };
    case ADD_ARTEFACT_COMMENT:
      return {
        ...state,
        artefactComments: state.artefactComments.concat(action.payload)
      };
    default:
      return state;
  }
}
