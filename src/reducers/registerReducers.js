import { C } from "../actions/registerTypes";

const initialState = {
  register_stage: C.GET_NAME,
  name: "",
  email: "",
  password: "",
  photoURL: ""
};

export default registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case C.GET_NAME:
      return {
        ...state,
        register_stage: C.GET_EMAIL,
        name: action.payload
      };
    case C.GET_EMAIL:
      return {
        ...state,
        register_stage: C.GET_PASSWORD,
        email: action.payload
      };
    case C.GET_PASSWORD:
      return {
        ...state,
        register_stage: C.GET_PHOTO,
        password: action.payload
      };
    case C.GET_PHOTO:
      return {
        ...state,
        photoURL: action.payload
      };
    default:
      return state;
  }
};
