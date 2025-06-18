// let arr = [5,23,"hello", true, "world",-9]
// console.log(arr);
// console.log(arr[1]);


//for
// for (let i = 0; i < array.length; i++) {
//    console.log(`${i} is ${arr[i]}`)     
// }
// console.log('------for in-------');



// for (e of arr){
//   console.log(e);
  
// }


// let arr = [5,23,"hello", true, "world",-9]

//     for (i in arr){
//         if(typeof arr[i] =="string"){
//             break;
//         }
//         console.log(arr[i]);
        
//     }


//     for (i in arr){
//         if(typeof arr[i] =="string"){
//             continue;
//         }
//         console.log(arr[i]);
        
//     }

/////

// const p1= [1,2,,"멈춰",3,4,true,false]

// for(i in p1){
//     if(p1[i] == "멈춰"){
//         break;
//     }
//     console.log(p1[i]);
    
// }

/////
const n1= [5,10,15,20,25]

for(i in n1){
    if(n1[i] >= 20) {
        break;
    }
    console.log(n1[i]);
    
}

////

const n2= [1,2,3,4,5,6,7,8,9,10]

for(i in n2){
    if(n2[i] % 2==1) {  // % 2==0 짝수
        continue;
    }
    console.log(n2[i]);
    
}

///
const n3= [1,2,3,4,5,6,7,8,9,10]

for(let i=1 ; i<=10 ; i++){  // % 3== 0 3의 배수
    if(i%3 ==0) {
        continue
    }
    console.log(i);
    
}

///

const p5 = ["사과",1,"바나나",2,"포도",false]

for (i in p5){
        if(typeof p5[i] =="string"){
        console.log(p5[i]);
        
    }}
