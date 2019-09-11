import { C } from "../types/fontLoaderTypes";

// load font
export const loadFont = () => {
  return {
    type: C.LOAD_FONT
  };
};

// discard font
export const discardFont = () => {
  return {
    type: C.DISCARD_FONT
  };
};
