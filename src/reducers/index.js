import { combineReducers } from "redux";
import authReducers from "./authReducers";
import errorReducers from "./errorReducers";
import dataReducers from "./dataReducers";
// import registerReducers from "./registerReducers";

export default combineReducers({
  auth: authReducers,
  errors: errorReducers,
  data: dataReducers
  // register: registerReducers
});
