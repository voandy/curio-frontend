import axios from "axios";

import {
  SET_IMAGE
} from "../types/imageTypes";

export const uploadImage = uri => dispatch => {
  console.log("uri is", uri);
  const image = {
    uri: uri,
    type: 'image/jpeg',
    name: 'image' + '-' + Date.now() + '.jpg'
  }
  // Instantiate a FormData() object
  const imgBody = new FormData();

  // append the image to the object with the title 'image'
  imgBody.append('image', image);
  console.log("imgBody is", imgBody);

  return axios
    .post(
      "http://curioapp.herokuapp.com/api/img-upload", 
      imgBody,
      config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        }
      }
    )
    .then(res => {

        console.log("imageURL in action is", res);
        // set image
        dispatch(setImage(res));
      }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
     })
    );
}

// assign user artefacts based on decoded
export const setImage = decoded => {
  return {
    type: SET_IMAGE,
    payload: decoded
  };
};