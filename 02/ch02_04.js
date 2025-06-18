const users = [
  { id: 1, name: "홍길동", age: 25, score: 85 },
  { id: 2, name: "김철수", age: 22, score: 92 },
  { id: 3, name: "이영희", age: 28, score: 76 },
  { id: 4, name: "최유리", age: 24, score: 85 },
  { id: 5, name: "정현우", age: 27, score: 90 },
  { id: 6, name: "윤아름", age: 23, score: 81 },
  { id: 7, name: "이수진", age: 26, score: 79 },
  { id: 8, name: "김민수", age: 21, score: 95 },
];

const youngs = users.filter((user) => {
  //   console.log(user);
  return user.age < 25;
});
console.log(youngs); //리턴 조건에 있는 사람만 반환해서 배열생성 표출

////점수 80점 미만
const score1 = users.filter((user) => {
  return user.score < 80;
});
console.log(score1);

// map함수
const userNames = users.map((user) => {
  return user.name;
});
console.log(userNames);

//아이디와이름만 반환 배열
const idName = users.map((user) => {
  return { name: user.name, id: user.id };
});
console.log(idName);

//성적80점이상 아이디,이름,성적
const hiScores = users
  .filter((user) => user.score > 80)
  .map((user) => {
    return { name: user.name, id: user.id, score: user.score };
  });
console.log(hiScores);

users.forEach((user) => {
  console.log(`${user.name}님의 점수는 ${user.score}입니다.`);
});

//reduce함수
const totalScore = users.reduce((sum, user) => {
  return sum + user.score;
}, 0);
console.log(totalScore);

//25살 이상 사람들 토탈점수
const totalScore1 = users
  .filter((user) => user.age > 25)
  .reduce((sum, user) => {
    return sum + user.score;
  }, 0);
console.log(totalScore1);

//a.age - b.age 가 음수이면 a가 b앞에있고 ,양수이면 a가 b뒤로 가고, 0이면 아무것도안합니다. - 나이오름차순정렬
const sortedByAge = [...users].sort((a, b) => {
  return a.age - b.age;
});
console.log(sortedByAge);

//
