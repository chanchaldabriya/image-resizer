/* importing CLOUD CONFIG */
import cloud  from '../config/cloud';
const {cloud_name, upload_preset} = cloud;

/* Deduces file dimensions of the file passed as argument */
const getFileDimensions = (file, callback) => {
    var reader = new FileReader();
    reader.onload = function (e) {
      var img = new Image();
      img.src = e.target.result;

      img.onload = function () {
        callback && callback({width: this.width, height: this.height});
      };
    };
    reader.readAsDataURL(file);
};

/* Uploads file to cloud - cloudinary */
const uploadImageToCloud = async (imgFile) => {
  debugger;
  const url = `https://api.cloudinary.com/v1_1/${cloud_name}/upload`;
  
  // Create form data with "imgFile" to be posted i.e uploaded
  var formData = new FormData();
  formData.append("upload_preset", upload_preset);
  formData.append("file", imgFile);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: formData
  });

  return response; 
};

export { getFileDimensions, uploadImageToCloud };