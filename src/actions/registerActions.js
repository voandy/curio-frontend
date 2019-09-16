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

export const setPhotoURI = photoURI => {
  return {
    type: C.SET_PHOTO_URI,
    payload: photoURI
  };
};

export const setUsername = username => {
  return {
    type: C.SET_USERNAME,
    payload: username
  };
};

export const setRegisterStage = registerState => {
  return {
    type: C.SET_REGISTER_STAGE,
    payload: registerState
  };
};

export const resetRegisterState = () => {
  return {
    type: C.RESET_REGISTER_STATE
  };
};
