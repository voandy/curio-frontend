const config = require("../../config.json");

// takes in the URI to the image file and uploads it to GCS
// returns the URL to the image file on GCS
export const uploadImageToGCS = async uri => {
  return new Promise((resolve, reject) => {
    const image = {
      uri: uri,
      type: "image/jpeg",
      name: "image" + "-" + Date.now() + ".jpg"
    };
    // Instantiate a FormData() object
    const imgBody = new FormData();
    // append the image to the object with the title 'image'
    imgBody.append("image", image);
    const url = config.SERVER_URL + "api/img-upload";
    fetch(url, {
      method: "POST",
      headers: {
        //prettier-ignore
        "Accept": "application/json",
        "Content-Type": "multipart/form-data"
      },
      body: imgBody
    })
      .then(res => res.json())
      .then(res => {
        resolve(res.imageUrl);
      })
      .catch(error => {
        reject(error);
      });
  });
};
