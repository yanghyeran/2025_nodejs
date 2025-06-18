//선언함수

function add1(x,y){
    return x+y
}
console.log(add1(1,2));

////////익명함수
const add2 = function (x,y){
    return x+y;
}
console.log(add2(2,3));

//////////화살표함수
const add3 = (x,y)=> {
    return x+y
}
console.log(add3(3,4));


///////콜백함수
const ten =(cb) => {
    for (let i = 0; i<10; i++) {
        cb();
    }
}
ten(function(){
    console.log('call function')
});

/////타이머함수
setTimeout(function(){
    console.log('1초뒤에호출');  
}, 1000) //1초뒤에실행 1000ms =>1초

////1초 마다 실행
setInterval(function() {
    console.log('1초마다실행');  
},1000) 




