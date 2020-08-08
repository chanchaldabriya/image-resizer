const getFileDimensions = (imgFile, callback) => {
    var reader = new FileReader();
    reader.onload = function (e) {
      var img = new Image();
      img.src = e.target.result;

      img.onload = function () {
        callback && callback({width: this.width, height: this.height});
      };
    };
    reader.readAsDataURL(imgFile);
};

export { getFileDimensions };