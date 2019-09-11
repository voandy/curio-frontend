import { C } from "../types/registerTypes";

const initialState = {
  register_stage: C.GET_NAME,
  name: "",
  email: "",
  password: "",
  passwordCfm: "",
  photoURL: ""
};

export default registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case C.GET_NAME:
      return {
        ...state,
        name: action.payload
      };
    case C.GET_EMAIL:
      return {
        ...state,
        email: action.payload
      };
    case C.GET_PASSWORD:
      return {
        ...state,
        password: action.payload
      };
    case C.GET_PASSWORDCFM:
      return {
        ...state,
        passwordCfm: action.payload
      };
    case C.GET_PHOTO:
      return {
        ...state,
        photoURL: action.payload
      };
    case C.SET_REGISTER_STAGE:
      return {
        ...state,
        register_stage: action.payload
      };
    default:
      return state;
  }
};
