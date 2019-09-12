import { C } from "../types/fontLoaderTypes";

export const loadFont = () => {
  return {
    type: C.LOAD_FONT
  };
};

export const discardFont = () => {
  return {
    type: C.DISCARD_FONT
  };
};
