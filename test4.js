//test4.js
var calc=require('./calc');
console.log('모듈 분리후 : '+calc.add(10,5))

var calc2=require('./calc2');
console.log('모듈 분리후 : '+calc2.divide(10,5));

//내장모듈 과 외장모듈
//npmjs.org
//nconf 모듈 시스템환경변수 접근할 수 있는모둘

var nconf=require('nconf');
nconf.env();
console.log('OS환경변수',nconf.get('OS'));

//node package manager (npm)
//API -> node -v v18.16.0 (LTS)
//nvm -> down grade
//node version manager

//package.json 에 npm으로 설치한 패키지 정보를 확인가능
// npm install -g yarn
//yarn add nconf

//npm unistall nconf --삭제
//npm install nconf --save
//package.json 파일 패키지정보추가
//yarn remove nconf
