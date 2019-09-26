import { SET_USER_ARTEFACTS, SET_SELECTED_ARTEFACT} from "../types/artefactsTypes";

const initialState = {
  userArtefacts: [],
  selectedArtefact: {}
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
      }
    default:
      return state;
  }
}
