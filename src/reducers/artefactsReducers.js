import { SET_USER_ARTEFACTS } from "../types/artefactsTypes";

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
    default:
      return state;
  }
}
