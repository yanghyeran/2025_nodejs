const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.ematl,
    }, //페이로드 :토큰에 담길 유저정보
    "access_token", //토큰 서명키 ,유효성 검증
    { expiresIn: "30d" } //만료일 30일
  );
};

module.exports = {
  generateAccessToken,
};
