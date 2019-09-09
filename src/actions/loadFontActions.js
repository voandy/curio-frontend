import { C } from "./loadFontTypes";

export const loadFont = () => {
  return {
    type: C.LOAD_FONT,
    payload: true
  };
};

export const fontNotReady = () => {
  return {
    type: C.NOT_READY_YET,
    payload: false
  };
};
