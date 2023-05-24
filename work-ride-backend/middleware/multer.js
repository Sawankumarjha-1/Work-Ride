const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const storage = multer.diskStorage({});
function fileFilter(req, file, cb) {
  if (!file.mimetype.includes("image")) {
    return cb("Invalid Image Format !", false);
  }

  cb(null, true);
}
module.exports = multer({ storage, fileFilter });
