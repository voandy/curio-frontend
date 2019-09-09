import { combineReducers } from "redux";
import authReducers from "./authReducers";
import errorReducers from "./errorReducers";
import userReducers from "./userReducers";
import groupsReducers from './groupsReducers';
import artefactsReducers from './artefactsReducers';

// import registerReducers from "./registerReducers";

export default combineReducers({
  auth: authReducers,
  errors: errorReducers,
  user: userReducers,
  groups: groupsReducers,
  artefacts: artefactsReducers
  // register: registerReducers
});
