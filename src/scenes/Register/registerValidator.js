const Validator = require("validator");

// Name checks
export const validateName = name => {

    let error = "";
    if (Validator.isEmpty(name)) {
        error = "Name field is required";
    }

    return error;
};

// email checks
export const validateEmail= email => {

    let error = "";
    if (Validator.isEmpty(email)) {
        error = "Email field is required";
    } else if (!Validator.isEmail(email)) {
        error = "Email is invalid";
    }
  
    return error;
};

// password checks
export const validatePassword= (password, passwordCfm) => {

    let error = "";
    if (Validator.isEmpty(password)) {
        error = "Password field is required";
    }
    if (Validator.isEmpty(passwordCfm)) {
        error = "Confirm password field is required";
    }
    if (!Validator.isLength(password, { min: 8 })) {
        error = "Password must be at least 8 characters";
    }
    if (!Validator.equals(password, passwordCfm)) {
        error = "Passwords must match";
    }

    return error;
};