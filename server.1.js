// 모듈을 추출합니다.
var http = require('http');
var express = require('express');
//웹 서버를 생성합니다.
var app = express();
app.use(express.static('public'));
app.use(express.bodyParser());
app.use(app.router);

app.post('/user', function(request, response) {
    // 변수를 선언합니다.
    var name = request.param('user_name');
    //var name=request.query.user_name 이 최신버전
    response.send(name);
});

app.all('/parameter',function(req,res){
    var name=req.query.name;
    var region=req.query.region;

    res.send(`<h1>${name} : ${region}</h1>`)
})

var items=[
    {name:'우유',price:200},
    {name:'홍차',price:400},
    {name:'커피',price:300}
];
app.all('/data.html',function(request,response){
    var out='';
    items.forEach(function(item){
        out+='<div>';
        out+='<span>'+item.name+':'+item.price+'원';
        out+='</span>';
        out+='</div>';
    })
    response.send(out);
});

//전체 조회
app.get('/products',(req,res)=>{    
    res.send(items);
})

//개별 데이터 조회
app.get('/products/:id',(req,res)=>{
    var id=Number(req.params.id);
    if(isNaN(id)){
        res.send({error:'숫자를 입력해주세요'})
    }else if(items[id]){
        res.send(items[id]);
    }else{
        res.send({error:'존재하지 않는 아이디 입니다.'})
    }
})

// 웹 서버를 실행합니다.
http.createServer(app).listen(52275, function() {
    console.log("server Running at http://127.0.0.1:52275");
});