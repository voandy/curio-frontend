import C from "../types/notificationTypes";

const initialState = {
  notifications: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case C.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload
      };
    default:
      return state;
  }
}
