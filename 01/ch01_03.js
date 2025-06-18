let date =new Date()

if (date.getHours()<12){
    console.log("오전")
}else {
    console.log("오후")
}

const hour = date.getHours()
const timeOfDay =hour <12 ? "오전":"오후"
console.log (`현재는 ${timeOfDay}입니다.`)

////////////////////////

const temperature =24

if (temperature>30){
    console.log("신선한 날씨")
}else if (temperature>20){
    console.log("따뜻한 날씨")
}else {
    console.log("더운 날씨")
}


//switch 문
const day = date.getDay()
console.log(day);

switch(day) {
case 0 :
    console.log("일요일"); break ; 
case 1 :
    console.log("월요일"); break ;
case 2 :
    console.log("화요일"); break ;
case 3 :
    console.log("수요일"); break ;
case 4 :
    console.log("목요일"); break ;
case 5 :
    console.log("금요일"); break ;
case 6 :
    console.log("토요일"); break ;
default :
    console.log("알수없는요일"); break ;
}

//짧은 조건문 (null, "" , 0 인 경우 출력)
const name = "혜란님" 
const diaplayName = name || "익명님"
console.log (`환영합니다${diaplayName}`)


//nullish 병합연산자 (null 또는 undefine 일때만 출력)
const userInput = null;
const defaultValue ="기본값"
const result = userInput ?? defaultValue;
console.log(`결과 :${ result}`)


//조건부 실행
const isLoggedIn =true; //false
isLoggedIn && console.log (" 로그인 되었습니다.")


// 반복문

