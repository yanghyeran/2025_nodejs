const validator = require("validator");

const email = "test@example.com";
console.log(`이메일 검증${email}은 ${validator.isEmail(email)}`);

const url = "http://www.naver.com";
console.log(`url 검증 ${url}은 ${validator.isURL(url)}`);

const phone = "010-9072-0076";
console.log(
  `전화번호 검증 ${phone}은 ${validator.isMobilePhone(phone, "ko-KR")}`
);

const num1 = "2025-08-28";
console.log(`숫자 검증 ${num1}은 ${validator.isNumeric(num1)}`);

const date1 = "2025-08-28";
console.log(`날짜 검증 ${date1}은 ${validator.isDate(date1)}`);

//비밀번호 검증
const password1 = "Password123!";
const v1 = validator.isStrongPassword(password1, {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
});
console.log(`비밀번호 ${password1} 은${v1}`);
