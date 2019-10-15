const Validator = require("validator");

export const validator = (field, input) => {
  let error;
  if (!Validator.isEmpty(input)) return "";
  switch (field) {
    case "imageURI":
      error = "A cover photo is required";
      break;
    case "title":
      error = "Group name is required";
      break;
    case "description":
      error = "Description of the group is required";
      break;
    default:
      error = "Unknown data field is passed in validator";
      break;
  }
  return error;
};
