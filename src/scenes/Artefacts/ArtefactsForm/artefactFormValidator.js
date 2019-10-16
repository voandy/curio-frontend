const Validator = require("validator");

export const validator = (field, input, guard = null) => {
  let error;
  if (!Validator.isEmpty(input)) return "";
  switch (field) {
    case "imageURI":
      // for image, we use imageURI as guard in redux action to determine
      // if we need to upload the current imageURI to GCS
      // therefore, even if imageURI we need to check that there's no
      // existing artefact photo to determine if this field is valid or not
      if (!guard) error = "An Image of the artefact is required";
      break;
    case "title":
      error = "Title field is required";
      break;
    case "description":
      error = "Description field is required";
      break;
    case "category":
      error = "Category field is required";
      break;
    case "dateObtained":
      error = "DateObtained field is required";
      break;
    default:
      error = "Unknown data field is passed in validator";
      break;
  }
  return error;
};
