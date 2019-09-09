import { combineReducers } from "redux";
import authReducers from "./authReducers";
import errorReducers from "./errorReducers";
import loadFontReducers from "./loadFontReducers";
import userReducers from "./userReducers";
// import registerReducers from "./registerReducers";

export default combineReducers({
  auth: authReducers,
  errors: errorReducers,
  loadFont: loadFontReducers
  user: userReducers
  // register: registerReducers
});
