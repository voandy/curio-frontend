import { combineReducers } from "redux";
import authReducers from "./authReducers";
import errorReducers from "./errorReducers";
import dataReducers from "./dataReducers";

export default combineReducers({
  auth: authReducers,
  errors: errorReducers,
  data: dataReducers
});
