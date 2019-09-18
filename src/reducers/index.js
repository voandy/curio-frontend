import { combineReducers } from "redux";
import authReducers from "./authReducers";
import errorReducers from "./errorReducers";
import userReducers from "./userReducers";
import groupsReducers from "./groupsReducers";
import artefactsReducers from "./artefactsReducers";
import imageReducers from "./imageReducers";
import registerReducers from "./registerReducers";

// export default combineReducers({
//   auth: authReducers,
//   errors: errorReducers,
//   user: userReducers,
//   groups: groupsReducers,
//   artefacts: artefactsReducers,
//   image: imageReducers,
//   register: registerReducers
// });

export const appReducer = combineReducers({
  auth: authReducers,
  errors: errorReducers,
  user: userReducers,
  groups: groupsReducers,
  artefacts: artefactsReducers,
  image: imageReducers,
  register: registerReducers
});

export default rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    // reset state
    state = undefined;
  }

  return appReducer(state, action);
};
