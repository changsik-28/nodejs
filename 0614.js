//통신산에 주고 받는 데이터 전송 형식
//CSV, XML ,JSON
var out='';
out+='이순신 50살 IT프로그래머\n'
out+='강감찬 30살 HTML프로그래머\n'
out+='홍길동 20살 CSS프로그래머\n'
out+='길복순 10살 JAVA프로그래머\n'

console.log(out)

out=out.split('\n')
console.log(out)

for(var i=0;i<out.length;i++){
    out[i]=out[i].split(',');
    for(var j=0;j<out[i];j++){
        out[i][j]=out[i][j].trim();
    }
}
console.log(out)
