import { SET_USER_ARTEFACTS, ADD_NEW_ARTEFACT, SET_SELECTED_ARTEFACT, UPDATE_SELECTED_ARTEFACT, DELETE_SELECTED_ARTEFACT, SET_ARTEFACT_COMMENTS } from "../types/artefactsTypes";

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
    case ADD_NEW_ARTEFACT:
      return {
        ...state,
        userArtefacts: state.userArtefacts.concat(action.payload)
      };
    case SET_SELECTED_ARTEFACT:
      return {
        ...state,
        selectedArtefact: action.payload
      }
    case UPDATE_SELECTED_ARTEFACT:
      return {
        ...state,
        selectedArtefact: action.payload
      }
    case DELETE_SELECTED_ARTEFACT:
      return {
        ...state,
      }
    case SET_ARTEFACT_COMMENTS:
      return {
        ...state,
        artefactComments: action.payload
      }
    default:
      return state;
  }
}
