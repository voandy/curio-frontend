const config = require("../../../config.json");
const Validator = require("validator");

// check if name passes all the validations
export const validateName = name => {
  let error = "";
  if (Validator.isEmpty(name)) {
    error = "Name field is required";
  }
  return error;
};

// check if email passes all the validations
export const validateEmail = email => {
  return new Promise((resolve, reject) => {
    if (Validator.isEmpty(email)) {
      resolve("Email field is required");
    } else if (!Validator.isEmail(email)) {
      resolve("Email is invalid");
    } else {
      // check for email uniqueness
      isEmailUnique(email).then(res => {
        // if response is undefined, ask user to submit again
        if (!res) {
          resolve("Please try again");
          // email is not used
        } else if (res.length === 0) {
          resolve("");
          // email already exists
        } else {
          resolve("Email already exists");
        }
      });
    }
  });
};

// check if username passes all the validations
export const validateUsername = async username => {
  return new Promise((resolve, reject) => {
    if (Validator.isEmpty(username)) {
      resolve("Username field is required");
    } else {
      // check for username uniqueness
      isUsernameUnique(username).then(res => {
        // if response is undefined, ask user to submit again
        if (!res) {
          resolve("Please try again");
          // username is not used
        } else if (res.length === 0) {
          resolve("");
          // email already exists
        } else {
          resolve("Username already exists");
        }
      });
    }
  });
};

// check if password passes all the validations
export const validatePassword = (password, passwordCfm) => {
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

// check with the backend to see if email has already exists
const isEmailUnique = email => {
  return new Promise((resolve, reject) => {
    const url = config.SERVER_URL + "api/user/email/" + email;
    fetch(url, {
      method: "GET"
    })
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        console.log(err);
        reject(res);
      });
  });
};

// check with the backend to see if username has already exists
const isUsernameUnique = username => {
  return new Promise((resolve, reject) => {
    const url = config.SERVER_URL + "api/user/username/" + username;
    fetch(url, {
      method: "GET"
    })
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        console.log(err);
        reject(res);
      });
  });
};
