import { combineReducers } from "redux";
import authReducers from "./authReducers";
import errorReducers from "./errorReducers";
import userReducers from "./userReducers";
import groupsReducers from "./groupsReducers";
import artefactsReducers from "./artefactsReducers";
import registerReducers from "./registerReducers";
import notificationReducers from "./notificationReducers";
import searchReducers from "./searchReducers";

// import auth types constant
import { USER_LOGOUT } from "../types/authTypes";

export const appReducer = combineReducers({
  auth: authReducers,
  errors: errorReducers,
  user: userReducers,
  groups: groupsReducers,
  artefacts: artefactsReducers,
  register: registerReducers,
  notification: notificationReducers,
  search: searchReducers
});

export default rootReducer = (state, action) => {
  // remove all redux states if user logs out
  if (action.type === USER_LOGOUT) {
    // reset all states
    state = undefined;
  }
  return appReducer(state, action);
};
