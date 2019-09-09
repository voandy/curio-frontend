import { C } from "../actions/loadFontTypes";

const initialState = {
  fontLoaded: false
};

export default loadFontReducer = (state = initialState, action) => {
  switch (action.type) {
    case C.LOAD_FONT:
      return {
        ...state,
        fontLoaded: true
      };
    case C.NOT_READY_YET:
      return {
        ...state,
        fontLoaded: false
      };
    default:
      return state;
  }
};
