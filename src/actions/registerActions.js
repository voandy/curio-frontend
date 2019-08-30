import { C } from "./registerTypes";

export const getName = name => {
  return {
    type: C.GET_NAME,
    payload: name
  };
};

export const getEmail = email => {
  return {
    type: C.GET_EMAIL,
    payload: email
  };
};

export const getPassword = password => {
  return {
    type: C.GET_NAME,
    payload: password
  };
};

export const getPhoto = photoURL => {
  return {
    type: C.GET_NAME,
    payload: photoURL
  };
};
