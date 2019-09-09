import { C } from "../types/fontLoaderTypes";

const initialState = {
  fontLoaded: false
};

export default fontLoaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case C.LOAD_FONT:
      return {
        fontLoaded: true
      };
    case C.DISCARD_FONT:
      return {
        fontLoaded: false
      };
    default:
      return state;
  }
};
