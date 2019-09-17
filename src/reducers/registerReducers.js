import { C } from "../types/registerTypes";

const initialState = {
  register_stage: C.SET_NAME,
  name: "",
  email: "",
  username: "",
  password: "",
  passwordCfm: "",
  photoURI: ""
};

export default registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case C.SET_NAME:
      return {
        ...state,
        name: action.payload
      };
    case C.SET_EMAIL:
      return {
        ...state,
        email: action.payload
      };
    case C.SET_USERNAME:
      return {
        ...state,
        username: action.payload
      };
    case C.SET_PASSWORD:
      return {
        ...state,
        password: action.payload
      };
    case C.SET_PASSWORDCFM:
      return {
        ...state,
        passwordCfm: action.payload
      };
    case C.SET_PHOTO_URI:
      return {
        ...state,
        photoURI: action.payload
      };
    case C.SET_REGISTER_STAGE:
      return {
        ...state,
        register_stage: action.payload
      };
    case C.RESET_REGISTER_STATE:
      return initialState;
    default:
      return state;
  }
};
