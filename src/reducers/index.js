import { combineReducers } from "redux";
import authReducers from "./authReducers";
import errorReducers from "./errorReducers";
import fontLoaderReducers from "./fontLoaderReducers";
import userReducers from "./userReducers";
// import registerReducers from "./registerReducers";

export default combineReducers({
  auth: authReducers,
  errors: errorReducers,
  fontLoader: fontLoaderReducers,
  user: userReducers
  // register: registerReducers
});
