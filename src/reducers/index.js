import { combineReducers } from "redux";
import authReducers from "./authReducers";
import errorReducers from "./errorReducers";
import fontLoaderReducers from "./fontLoaderReducers";
import userReducers from "./userReducers";
import groupsReducers from "./groupsReducers";
import artefactsReducers from "./artefactsReducers";
import imageReducers from "./imageReducers";

// import registerReducers from "./registerReducers";

export default combineReducers({
  auth: authReducers,
  errors: errorReducers,
  user: userReducers,
  groups: groupsReducers,
  artefacts: artefactsReducers,
  fontLoader: fontLoaderReducers,
  image: imageReducers,
  // register: registerReducers
});
