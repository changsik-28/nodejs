//모듈을 추출한다.
var http=require('http');
var express=require('express');
var mysql=require('mysql');

//데이터베이스와 연결
var client=mysql.createConnection({
    user:'root',
    password:'1234',
    database:'college'
});

//웹서버를 생성
var app=express();
app.use(express.static('public'));//기본폴더지정
//post 요청시 파라미터 전달
app.use(express.bodyParser());
app.use(app.router);

//client.query('use company');

//라우터 설정
//전체조회
app.get('/students',function(req,res){
    var query='select * from students';
    client.query(query,function(err,result){
        res.send(result);
});
});//get end

//개별조회
//상세조회
app.get('/students/:id',function(req,res){
    var id=req.params.id;
    var sql="select * from students where id='"+id+"'";

    client.query(sql,[id],function(err,result){
        res.send(result);
    })
});//get :id end

//데이터추가
app.post('/students',function(req,res){
    var id=req.body.id;
    var name= req.body.name;
    var pw=req.body.password;
    var email=req.body.email;
    var gender=req.body.gender;
    var data={id,name,pw,email,gender};
    console.log(data);

    //DB연동
    var sql='insert into students (id,name,password,email,gender)values(?,?,?,?,?)';
    client.query(sql,[id,name,pw,email,gender],function(err,result){
        
        // res.send(err||result);
        res.redirect("member_ok.html");//재요청
    });


});//post end

//데이터 수정
app.put('/students/:id',function(req,res){
    var id=req.body.id;
    var name=req.body.name;
    var pw=req.body.password;
    var email=req.body.email;
    var gender=req.body.gender;

    var sql='update students set name=?,password=?,email=?,gender=? where id=?'
    client.query(sql,[name,pw,email,gender,id],function(err,result){
        // res.redirect("memeber_update.html")
        res.send(result);
    })
});//put end

//데이터삭제
app.delete('/students/:id',function(req,res){
    var id=req.params.id;
    var sql="delete from students where id='"+id+"'";
    client.query(sql,function(err,result){
        res.send(result);
    })

});//del end

//parameter
app.all('/parameter',function(req,res){
    var name=req.body.name || req.query.name;
    var modelnumber=req.body.modelnumber || req.query.modelnumber;
    var series=req.body.series || req.query.series;

    var data={name,modelnumber,series};
    var sql='insert into products (name,modelnumber,series)values(?,?,?)';
    client.query(sql,[name,modelnumber,series],function(err,result){
        if(result){
            res.send(data);
        }else{
            res.send(err);
        }
    });
});

http://127.0.0.1:52273/parameter?name=최경식&modelnumber=4885&series=물총잡이



//웹서버를 실행한다.
http.createServer(app).listen(52273,function(){
    console.log('Server Running at .....');
    console.log('http://127.0.0.1:52273');
});