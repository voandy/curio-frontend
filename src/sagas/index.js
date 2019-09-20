import { call, put } from "redux-saga/effects";
import { takeLatest } from "redux-saga/effects";
import { loginUserAPIRequest } from "../utils/auth/authHelpers";

export function* registerUser(user) {
  console.log("Saga!");
  //   try {
  //     yield put({ type: "REGISTER_USER", user });
  //   } catch (error) {
  //     console.log("Error in Saga!");
  //     // yield put({type:"REGISTER_USER", user})
  //   }
}

export function* loginUser(action) {
  const decoded = yield call(loginUserAPIRequest, action.payload);
  yield call(console.log, decoded);
  yield put({ type: "SET_CURRENT_USER", payload: decoded });
}

// function* watchRegisterUser() {
//   yield takeLatest("REGISTER_USER", registerUser);
// }

// use them in parallel
export default function* rootSaga() {
  yield takeLatest("LOGIN_USER", loginUser);
}
