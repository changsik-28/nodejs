// 모듈을 추출합니다.
var http = require('http');
var express = require('express');
//웹 서버를 생성합니다.
var app = express();
app.use(express.static('public'));
app.use(express.bodyParser());
// app.use(app.router);

// 라우트 처리
app.all("/a",function(req,res){
    res.send("<h1>Page A.....</h1>");
});
app.all("/b",function(req,res){
    res.send("<h1>Page B.....</h1>");
});
app.all("/c",function(req,res){
    res.send("<h1>Page C.....</h1>");
});

app.post('/user', function(request, response) {
    var name = request.param('user_name');
    response.send(name+"로그인했다.");
    // console.log(`${request}를 처리하였습니다.`);
});

app.all("/parameter", function(request,response){
    var name = request.query.name;
    var region = request.query.region;
    response.send(`<h1>${name} : ${region}</h1>`);
    // console.log(`${request}를 처리하였습니다.`);  
})

var items = [
    {name:'우유', price:200},
    {name:'홍차', price:300},
    {name:'커피', price:500}
];

app.all('/data.html', function(request,response){
    var out="";
    items.forEach(function(item){
        out += "<div>";
        out += "<span>" + item.name + " : " + item.price + "원</span>";
        out += "</div>";
    })
    response.send(out);
})

//전체 조회
app.get('/products',(req,res)=>{
    res.send(items);
})

app.post('/products',(req,res) => {
    // res.send(items);
    //폼에서 입력한 폼데이터 값을 받아서 변수에 저장
    var name = req.body.name || req.query.name;
    var price = req.param('price');
    var item = {
        name: name,
        price: price
    }
    items.push(item);
    res.send({
        message:'데이트를 추가했습니다',
        data:item
    })
    

})
//개별 데이터 조회
app.get('/products/:id',(req,res) => {
    // var id = req.query.id;
    var id = req.params.id;
    id = Number(req.param('id'));

    if(isNaN(id)){
        res.send({error:"숫자를 입력해주세요"});
    } else if(items[id]){
        res.send(items[id]);
    } else {
        res.send({error:"존재하지 않는 아이디입니다"});
    }
    
    // res.send(items[id]);    
})

//개별데이터 수정
app.put('/products/:id',function(req,res){
    var id=Number(req.param('id'));
    var name=req.body.name;
    var price=req.body.price;

    if(items[id]){
    items[id].name=name;
    items[id].price=price;
    
    res.send({
        message:'데이터를 수정햇습니다.',
        data:items[id]
    })
}else{
    res.send({
        error:'존재하지 않는 데이터 입니다. '
    })
}
})

//삭제하기
app.del('/products/:id',function(req,res){
    var id= Number(req.param('id'));
    if(isNaN(id)){
        res.send({error:'숫자를 입력하세용'})
    }else if(items[id]){
        items.splice(id,1);
        res.send({
            message:'데이터를 삭제했습니다.'
        })
    }else{
        res.send({
            error:'존재하지 않는 데이터 입니다. '
        })
    }
})



// 웹 서버를 실행합니다.
http.createServer(app).listen(52275, function() {
    console.log("server Running at http://127.0.0.1:52275");

});
// npm install express@3.4.7