const fetchData = (callback) => {
  //콜백에서 받은 핸들데이터
  setTimeout(() => {
    //서버에서 데이터를 받는 부분
    const data = "서버에서 받은 데이터";
    callback(data);
  }, 1000);
};

const handleData = (data) => {
  //서버에서 받은 데이터를 처리하는 내용,데이터 파싱 등
  console.log("콜백에서 받은 데이터", data);
};

//fetchData(handleData)

const fetchDataPromise = () => {
  return new Promise((resolve, reject) => {
    //resolve 함수,reject 함수
    setTimeout(() => {
      const sucess = true; //작업 성공여부
      if (sucess) {
        resolve(); //성공됐을때 호출되는함수 ,외부에서 데이터를 가져오는데 성송
      } else {
        reject(); //실패했을때 호출되는함수, 외부에서 데이터를 가져오는데 실패
      }
    }, 1000);
  });
};

fetchDataPromise() //외부라이브러리들이 이런 형태로 함수를 제공
  .then((data) => {
    //resolve 데이터 패치가 성공했을때 실행
    console.log("프로미스에서 받은 데이터", data);
  })
  .catch((error) => {
    //reject 데이터 패치가 실패했을때 실행
    console.log("에러", error);
  });

const getData = async () => {
  try {
    console.log(await fetchDataPromise());
    console.log("async/await data", data); //resolve 데이터패치가 성공했을대 처리로직
  } catch (e) {
    console.log("에러", error); //reject 데이터 패치가 실패했을때 처리로직
  }
};

//////////2초 후 안녕하세요 라는 메세지를 출력하는 promise를 만들고 실행

const greet = () => {
  return new Promise((resolve, reject) => {
    //resolve 함수,reject 함수
    setTimeout(() => {
      resolve(); //성공됐을때 호출되는함수 ,외부에서 데이터를 가져오는데 성송
    }, 2000);
  });
};
greet().then((message) => {
  console.log(message);
});

///////

const sayHi = async () => {
  try {
    const data = await greet();
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};
