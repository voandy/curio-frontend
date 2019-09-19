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

export const validateUsername = async username => {
  return new Promise((resolve, reject) => {
    if (Validator.isEmpty(username)) {
      resolve("Username field is required");
    } else {
      isUsernameUnique(username).then(res => {
        if (!res) {
          resolve("Please try again");
        } else if (res.length === 0) {
          resolve("");
        } else {
          resolve("Username already exists");
        }
      });
    }
  });
};

// password checks
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

const isEmailUnique = email => {
  return new Promise((resolve, reject) => {
    const url = "http://curioapp.herokuapp.com/api/user/email/" + email;
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

const isUsernameUnique = username => {
  return new Promise((resolve, reject) => {
    const url = "http://curioapp.herokuapp.com/api/user/username/" + username;
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
