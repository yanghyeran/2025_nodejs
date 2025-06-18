const moment = require("moment");

const nowDate = moment(); //현재시각 가져옴
console.log(nowDate.format("YYYY-MM-DD HH:mm:ss"));
console.log(nowDate.format("YYYY년 MM월 DD일 HH시 mm분 ss초"));

//현재날짜 2025/06/18형태로 출력
console.log(nowDate.format("YYYY/ MM/ DD "));

//특정날짜 문자열을 모멘트 객체 형태로 변경
const dateMoment = moment("2024-03-30");
console.log(dateMoment);

//시간을 더하고 빼기
const nextDays = nowDate.add(7, "days");
console.log(nextDays);

//시간 차이 계산
// const startDate = moment();
// const endDate = moment("2025-08-20");
// const diffDay = endDate.diff(startDate, "days");
// console.log("과정 종료까지 남은 날", startDate, endDate, diffDay);

// 오늘부터 100일 후 날짜를 출력
const todayDate = moment();
const nextDays1 = todayDate.add(100, "days");
console.log(nextDays1.format("YYYY년 MM월 DD일 "));

//2024-03-15 부터 2025-09-20 까지 몇 개월 지났는지 계산
const s1 = moment("2024-03-15");
const e1 = moment("2025-09-20");
const mb1 = e1.diff(s1, "months");
console.log(mb1);

//크리스마스까지 남은 일수 계산
const startDate = moment();
const endDate = moment("2025-12-25");
const diffDay = endDate.diff(startDate, "days");
console.log("크리스마스까지 남은 날", startDate, endDate, diffDay);
