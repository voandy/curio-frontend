import {
  SET_USER_GROUPS,
  SET_SELECTED_GROUP,
  SET_SELECTED_GROUP_ARTEFACTS,
  SET_SELECTED_GROUP_MEMBERS,
  ADD_SELECTED_GROUP_ARTEFACTS_COMMENTS,
  SET_SELECTED_GROUP_ARTEFACT_COMMENTS,
} from "../types/groupsTypes";

const initialState = {
  userGroups: [],
  selectedGroup: {},
  selectedGroupArtefacts: [],
  selectedGroupMembers: [],
  selectedGroupArtefactsComments: [],
  loadingSelectedGroupArtefactComments: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_GROUPS:
      return {
        ...state,
        userGroups: action.payload
      };
    case SET_SELECTED_GROUP:
      return {
        ...state,
        selectedGroup: action.payload
      };
    case SET_SELECTED_GROUP_ARTEFACTS:
      return {
        ...state,
        selectedGroupArtefacts: action.payload
      };
    case SET_SELECTED_GROUP_MEMBERS:
      return {
        ...state,
        selectedGroupMembers: action.payload
      };
    case ADD_SELECTED_GROUP_ARTEFACTS_COMMENTS:
      return {
        ...state,
        selectedGroupArtefactsComments: state.selectedGroupArtefactsComments.concat(action.payload)
      }
    default:
      return state;
  }
}
