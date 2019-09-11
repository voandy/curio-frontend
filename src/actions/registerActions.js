import { C } from "../types/registerTypes";

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
    type: C.GET_PASSWORD,
    payload: password
  };
};

export const getPasswordCfm = passwordCfm => {
  return {
    type: C.GET_PASSWORDCFM,
    payload: passwordCfm
  };
};

export const getPhotoURL = photoURL => {
  return {
    type: C.GET_PHOTOURL,
    payload: photoURL
  };
};

export const setRegisterStage = registerState => {
  return {
    type: C.SET_REGISTER_STAGE,
    payload: registerState
  };
};
