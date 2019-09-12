import { C } from "../types/registerTypes";

export const setName = name => {
  return {
    type: C.SET_NAME,
    payload: name
  };
};

export const setEmail = email => {
  return {
    type: C.SET_EMAIL,
    payload: email
  };
};

export const setPassword = password => {
  return {
    type: C.SET_PASSWORD,
    payload: password
  };
};

export const setPasswordCfm = passwordCfm => {
  return {
    type: C.SET_PASSWORDCFM,
    payload: passwordCfm
  };
};

export const setPhotoURL = photoURL => {
  return {
    type: C.SET_PHOTOURL,
    payload: photoURL
  };
};

export const setRegisterStage = registerState => {
  return {
    type: C.SET_REGISTER_STAGE,
    payload: registerState
  };
};
