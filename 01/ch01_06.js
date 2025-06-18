//객체
const person1 = {
    name:'양혜란',
    age :50,
    job:'sw engineer'
}
console.log(person1.name,person1['name']);
person1.hobby = ["cook","fishing"]
console.log(person1);

console.log(Object.keys(person1));
console.log(Object.values(person1));


person1.addAge = function(){
    this.age =this.age+1;
}
person1.addAge();
console.log(person1);

///////class
class personInfo {
    constructor(name,age,address) {
        this.name =name;
        this.age =age;
        this.address =address;
    }

    addAge(age) {
        this.age =this.age+age;
    }

    getAge(){
        return this.age
    }
}

let p1 = new personInfo ("양혜란",50,"합정동")
console.log(p1);
p1.addAge(50)
console.log(p1.getAge());


//상속

class Employee extends personInfo{
    constructor (name,age,address,salary){
        super(name,age,address)
        this.salary = salary;
    }
}
let e1 =new Employee("홀길동",60,"부평",1000000)
console.log(e1);



try {
    const arr =new Array(-1)
} catch (e) {
    console.log("예외발생",e)
    
}finally {
    console.log("예외가 발생해도 이작업은 반드시 필요");
    
}


try {
    const err =new Error("나만의에러")
    err.name ="나만의 에러"
    err.message ="나만의 에러 완성"
    throw err
} catch (e) {
    console.log(e.name, e.message);
}


//////////클래스명 CarInfo , 메서드는 drive() ->"모델 xx가 달리는중" ,stop()-> "모델xx가 멈췄습니다."

class CarInfo{
    constructor(brand,color,model) {
        this.brand = brand;
        this.color = color;
        this.model = model;
    }
drive() {
    console.log(`모델 ${this.model} 달리는중"`);
    
}
stop() {
    console.log(`모델 ${this.model} 멈춤"`);
}
}
c1  = new CarInfo("현대","흰색","소나타")
c2  = new CarInfo("현대","쥐색","그랜져")
c1.drive();
c2.stop();

////////// CarInfo 상속받아 ElectricCarInfo,  charge() ->"모델 xx가 충전중" ,stop()-> "모델xx가 멈췄습니다."

class ElectricCarInfo extends CarInfo {
    constructor(brand,color,model,battery) {
        super(brand,color,model)
        this.battery = battery
    }
    charge(){
        console.log('모델 ${this.model)이 충전중');

    }
}
let ec1 = new ElectricCarInfo ("테슬라","쥐색","모델y",40000)
ec1.charge()
ec1.stop()

