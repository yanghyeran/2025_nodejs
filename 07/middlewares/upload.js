const multer = require("multer");
const path = require("path");
const uploadDir = `public/uploads`;

const storage = multer.diskStorage({
  destination: `./${uploadDir}`, // 요 파일이 있는 디렉토리 하위로 uploadDir 만들어주세요
  filename: function (req, file, cb) {
    const fname =
      path.parse(file.originalname).name +
      "-" +
      Date.now() +
      path.extname(file.originalname);
    cb(
      null, // Error
      fname
    );
  },
});
//추가
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
const uploadSingle = upload.single("file");
const uploadMultiple = upload.array("files", 5);

module.exports = {
  uploadSingle,
  uploadMultiple, //추가
};
