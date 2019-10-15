const Validator = require("validator");

// check if field is not empty
// ImageURI
export const validateImage = input => {

    console.log("HAHA")

    let error = ""
    if (Validator.isEmpty(input)) {
        error = "An Image of the artefact is required";
    }
    return error
};

// Title
export const validateTitle = input => {

    let error = ""
    if (Validator.isEmpty(input)) {
        error = "Title field is required";
    }
    return error
};

// Description
export const validateDescription = input => {

    let error = ""
    if (Validator.isEmpty(input)) {
        error = "Description field is required";
    }
    return error
};

// Category
export const validateCategory = input => {

    let error = ""
    if (Validator.isEmpty(input)) {
        error = "Category field is required";
    }
    return error
};

// date
export const validateDate = input => {

    let error = ""
    if (Validator.isEmpty(input)) {
        error = "Date field is required";
    }
    return error
};