//req 요청
//res 응답

var http=require('http');
var express=require('express');


var app=express();

app.use(express.static('public'))//시작폴더지정
//시작폴더에 index.html 이 기본 디폴트 값이고 바꾸고 싶으면 
//'파일명',(index:'파일이름')식으로 설정하면 된다
//예를 들어서 public이라는 파일안에 다른 main이라는 파일을 선택하고 싶을경우
//app.use(express.static('public',(index:'main.html')))이라고 지정하면 된다.


app.use(app.router);

//router 처리
app.all('/a',function(req,res){
    res.send('<h1>Page A----</h1>')
})
app.all('/b',function(req,res){
    res.send('<h1>Page B----</h1>')
})
app.all('/c',function(req,res){
    res.send('<h1>Page C----</h1>')
})
app.use(function(req,res){
    res.send('<h1>잘못들어오신것같은데요^^</h1>')   //에러 페이지를 자동 설정해놓는거다
})


http.createServer(app).listen(52273,function(){
    console.log('Server Running at http://127.0.0.1:52273')
});