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

var items=[
    {name:'우유',price:2000},
    {name:'커피',price:1000},
    {name:'홍차',price:4000}
];

app.all('/food',function(request,response){
    var out='';
    items.forEach((item)=>{
        out+='<ul>';
        out+='<li>'+item.name+'</li>';
        out+='<li>'+item.price+'</li>';
        out+='</ul>';
    });
    response.send(out);
});

app.all("/foodjson",function(request,response){
    response.send(items);
});

app.all("/foodxml",function(request,response){
    var out="";
    out+='<?xml version="1.0" encoding="utf-8" ?>';
    out+="<products>";
    items.forEach((item)=>{
        out+="<product>";
        out+="<name>"+item.name+"</name>";
        out+="<price>"+item.price+"</price>";
        out+="</product>";
    });
    out+="</products>";
    response.type("text/xml");
    response.send(out);
});

app.get("/aaa",(req,res)=>{
    //상태코드
    res.status(404);
    //응답헤더
    res.set('AAA','BBB');
    res.set({
        'name':'yang',
        'age': '20'
    });
    res.send('내 마움대로 입력해보자');
});

http.createServer(app).listen(52273,function(){
    console.log('Server Running at http://127.0.0.1:52273')
});