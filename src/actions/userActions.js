// import constants
import { SET_CURRENT_USER_DATA } from "../types/userTypes";

// API helper
import { getUserAPIRequest, updateUserDataAPIRequest, deleteUserDataAPIRequest } from "../utils/APIHelpers/userAPIHelpers";
import { getUserArtefactsAPIRequest } from "../utils/APIHelpers/artefactAPIHelpers";
import { uploadImageToGCS } from "../utils/imageUpload";

// Async Redux actions //
// get user data belonging to userId
export const getUserData = userId => dispatch => {
  return new Promise((resolve, reject) => {
    //get user by id
    getUserAPIRequest(userId)
      // success
      .then(res => {
        dispatch(setCurrentUserData(res.data));
        resolve(res);
      })
      // failure
      .catch(err => {
        console.log("Failed to get user data : " + err);
        reject(err);
      });
  });
};

// get user data belonging to userId
export const getSpecificUser = userId => dispatch => {
  return new Promise((resolve, reject) => {
    //get user by id
    getUserAPIRequest(userId)
      // success
      .then(res => {
        // return user data instead of request response
        resolve(res.data);
      })
      // failure
      .catch(err => {
        console.log("Failed to get user data : " + err);
        reject(err);
      });
  });
};

// get user data belonging to userId
export const getSpecificUserArtefacts = userId => dispatch => {
  return new Promise((resolve, reject) => {
    // get all artefacts posted by user
    getUserArtefactsAPIRequest(userId)
      // success
      .then(res => {
        // return user data instead of request response
        resolve(res.data);
      })
      // failure
      .catch(err => {
        console.log("Failed to get user data : " + err);
        reject(err);
      });
  });
};

// edit user details (imageURI, name, password)
// export const editUserData = user => dispatch => {
//   return new Promise((resolve, reject) => {
//     (() => {
//       // if new image is selected, imageURI will not be empty
//       // will upload to GCS, otherwise retain old URL link
//       return !user.imageURI
//         ? Promise.resolve(user.profilePic)
//         : uploadImageToGCS(user.imageURI)
//     })()
//       .then(imageURL => {
//         const userData = {
//           ...user,
//           profilePic: imageURL
//         };
//         updateUserDataAPIRequest(user._id, userData)
//           .then(res => {
//             dispatch()
//           })
//       })
//     uploadImageToGCS(user.imageURI).then(imageurl => {
    
//     })
//   })
// }

// new image have been selected, imageURI not empty
// .catch(err => {
//   console.log("Failed to edit user details", err);
//   reject(err);
// })

// Redux actions //
// Set logged in user
export const setCurrentUserData = decoded => {
  return {
    type: SET_CURRENT_USER_DATA,
    payload: decoded
  };
};
