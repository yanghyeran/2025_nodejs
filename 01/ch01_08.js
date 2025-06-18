// const fruits = ["사과", "수박", "바나나", "오렌지"];
// const [first, second] = fruits;
// console.log(first, second);

// const student = {
//   name: "양혜란",
//   age: 50,
//   grade: "B",
// };
//객체 구조분해 할당
// const { name, age, grade } = student;
// console.log(name, age, grade);
//객체 구조분해-다른변수 이름으로 할당
// const { name: name1, age: age1, grade: grade1 } = student;
// console.log(name1, age1, grade1);

// const person = {
//   name: "홍길동",
// };
//기본값 예제 age에 기본갑을 25로 주세요.
// const { name: personName, age: personAge = 25 } = person;
//객체를 매개변수로 받는 함수
// const printStudentInfo = ({ name, age, grade = "B" }) => {
//   console.log("학생정보");
//   console.log(`-이름 : ${name}`);
//   console.log(`-나이 : ${age}`);
//   console.log(`-성적 : ${grade}`);
// };
// printStudentInfo(student); //객체가 그대로 인자로 들어옴

//북 객체를 출력하는 함수를 만드시오. 프린트 북 매개변수 객체구조 분해할당이용
// const book = {
//   title: "자바스크립트 최고",
//   author: "홍길동",
//   publisher: "한빛",
// };

// const printBooktInfo = ({ title, author, publisher }) => {
//   console.log("--------책정보---------");
//   console.log(`-제목 : ${title}`);
//   console.log(`-저자 : ${author}`);
//   console.log(`-출판사 : ${publisher}`);
// };
// printBooktInfo(book);
//북 객체를 출력하는 함수를 만드시오. 프린트 북 매개변수 객체구조 분해할당이용

// const user = {
//   id: 1,
//   info: {
//     name: "홍길동",
//     address: {
//       city: "서울",
//       street: "강남대로",
//     },
//   },
// };
// const {
//   id,
//   info: {
//     name: userName,
//     address: { city, street },
//   },
// } = user;
// console.log(`- id : ${id}`);
// console.log(`-이름 : ${userName}`);
// console.log(`-도시 : ${city}`);
// console.log(`-거리 : ${street}`);

//firstcolor,secondcolor 할당헤보세요
// const colors = ["빨강", "파랑", "노랑", "초록", "보라"];

// const [firstcolor, secondcolor, ...others] = colors;
// console.log(firstcolor, secondcolor, others);

const user1 = { name: "소지섭", age: 45, email: "so@email.com" };
const user2 = { name: "전종서", age: 30 };

const formatUserInfo = ({ name, age, email = "이메일 없음" }) => {
  return `이름은${name}, 나이는${age},이메일은 ${email}`;
};

console.log(formatUserInfo(user1));
console.log(formatUserInfo(user2));
