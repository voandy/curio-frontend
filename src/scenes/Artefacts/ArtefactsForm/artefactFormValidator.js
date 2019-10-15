const Validator = require("validator");

export const validator = (field, input) => {
  let error;
  if (!Validator.isEmpty(input)) return "";
  switch (field) {
    case "imageURI":
      error = "An Image of the artefact is required";
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
